<?php

namespace App\Admin\Controllers;

use ZipArchive;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Dcat\Admin\Layout\Content;
use App\Services\PluginManager;
use Madnest\Madzipper\Madzipper;
use App\Admin\Repositories\Plugin;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Models\Plugin as ModelsPlugin;
use Illuminate\Support\Facades\Artisan;
use App\Admin\Actions\Grid\PluginReload;

class PluginController extends Controller
{
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return new Grid(null, function (Grid $grid) {
            $grid->column('id', '插件标识')->explode()->label();
            $grid->column('PluginName', '插件名称')->explode()->label();
            $grid->column('namespace', '插件命名空间')->explode('\\')->label();
            $grid->column('path', '插件路径');
            $grid->column('md5','插件md5值');
            $grid->column('status', '开启/关闭')->status()->switch();
            $grid->disableRowSelector();
            //$grid->disableCreateButton();
            $grid->disableActions();
            $grid->tools(new PluginReload());
            $grid->disableBatchDelete();
            $grid->disablePagination();
            $grid->model()->setData($this->generate());
        });
    }

    /**
     * 获取所有插件
     *
     * @return array
     */
    public function generate()
    {
        $PluginManager = new PluginManager();
        $data = [];
        foreach ($PluginManager->getAllPlugins() as $key => $value) {
            $check = ModelsPlugin::where(['name' => $key, 'status' => 1])->count();
            $data[] = [
                'id' => $key,
                'name' => $key,
                'PluginName' => ($value['data']['name']),
                'path' => $value['path'],
                'md5' => hashDirectory($value['path']),
                'namespace' => $value['data']['namespace'],
                'status' => $check,
            ];
        }
        return $data;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     *
     * @return Show
     */
    protected function detail($id)
    {
        return Show::make($id, new Plugin(), function (Show $show) {
            $show->field('id');
            $show->field('name');
            $show->field('path');
            $show->field('class');
            $show->field('status');
            $show->field('created_at');
            $show->field('updated_at');
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Form::make(new Plugin(), function (Form $form) {
            $form->file('file', '选择插件')->accept('zip')->removable();
            $form->disableFooter();
        });
    }
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title;

    /**
     * Set description for following 4 action pages.
     *
     * @var array
     */
    protected $description = [
        //        'index'  => 'Index',
        //        'show'   => 'Show',
        //        'edit'   => 'Edit',
        //        'create' => 'Create',
    ];

    /**
     * Get content title.
     *
     * @return string
     */
    protected function title()
    {
        return $this->title ?: admin_trans_label();
    }

    /**
     * Get description for following 4 action pages.
     *
     * @return array
     */
    protected function description()
    {
        return $this->description;
    }

    /**
     * Index interface.
     *
     * @param Content $content
     *
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->title($this->title())
            ->description($this->description()['index'] ?? trans('admin.list'))
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed   $id
     * @param Content $content
     *
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->title($this->title())
            ->description($this->description()['show'] ?? trans('admin.show'))
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed   $id
     * @param Content $content
     *
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->title($this->title())
            ->description($this->description()['edit'] ?? trans('admin.edit'))
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     *
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->title($this->title())
            ->description($this->description()['create'] ?? trans('admin.create'))
            ->body($this->form());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update($name)
    {
        $data = read_plugin_data($name,false);
        if(@Arr::has($data,"dirname") && $data['dirname']!=$name){
            rename(plugin_path($name),plugin_path($data['dirname']));
            $name = $data['dirname'];
        }
        if(@read_plugin_md5($name) && read_plugin_md5($name)!=hashDirectory(plugin_path($name))){
            return [
                'status' => false,
                'data' => [
                    'message' => "插件md5值校验失败",
                    'type' => 'error'
                ]
            ];
        }
        $status = request()->input('status', 0);
        if (ModelsPlugin::where('name', $name)->count()) {
            // 存在
            ModelsPlugin::where('name', $name)->update([
                'status' => $status
            ]);
            if ($status) {
                $ev = "启用";
            } else {
                File::deleteDirectory(public_path("Plugins/".$name));
                $ev = "禁用";
            }
        } else {
            // 不存在
            ModelsPlugin::insert([
                'name' => $name,
                'status' => $status,
                'created_at' => date("Y-m-d H:i:s")
            ]);
            File::deleteDirectory(public_path("Plugins/".$name));
            $ev = "启用";
        }
        Artisan::call("Plugin:Publish");
        Artisan::call("CodeFec:octane:reload");
        return [
            'status' => true,
            'data' => [
                'message' => "插件:" . $name . $ev . '成功!',
                'type' => 'success'
            ]
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return mixed
     */
    public function store(Request $request)
    {
        //$path = $request->file('_file_')->store('file');
        $file = $request->_file_;
        $file->move(app_path("Plugins"), $file->getClientOriginalName());
        $path = app_path("Plugins/" . $file->getClientOriginalName());
        //实例化ZipArchive类
        $zip = new ZipArchive();
        //打开压缩文件，打开成功时返回true
        if ($zip->open($path) === true) {
            $zip->extractTo(app_path("Plugins/"));
            //关闭
            $zip->close();
            File::delete($path);
            return response()->json([
                'status' => true,
                'data' => [
                    'message' => "插件安装成功!",
                    "type" => 'success',
                    "then" => [
                        "action" => "redirect",
                        "value" => admin_url("Plugin")
                    ]
                ],
            ]);
        } else {
            return response()->json([
                'status' => false,
                'data' => [
                    'message' => "插件安装失败!",
                    "type" => 'error',
                    "then" => [
                        "action" => "redirect",
                        "value" => admin_url("Plugin/create")
                    ]
                ],
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->form()->destroy($id);
    }
}
