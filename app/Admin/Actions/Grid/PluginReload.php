<?php

namespace App\Admin\Actions\Grid;

use Illuminate\Http\Request;
use Dcat\Admin\Actions\Response;
use Dcat\Admin\Traits\HasPermissions;
use Dcat\Admin\Grid\Tools\AbstractTool;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Contracts\Auth\Authenticatable;

class PluginReload extends AbstractTool
{
    /**
     * @return string
     */
	protected $title = '重载插件';

    protected $style = 'btn btn-primary grid-refresh btn-mini btn-outline';

    
    /**
     * Handle the action request.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function handle(Request $request)
    {
        Artisan::call("CodeFec:octane:reload");
        return $this->response()
            ->success('Processed successfully.');
    }
    

    /**
     * @return string|void
     */
    protected function href()
    {
        // return admin_url('auth/users');
    }

    /**
	 * @return string|array|void
	 */
	public function confirm()
	{
		return ['去定要重载插件吗?', '为了性能相关,登录后 后台可能不会显示插件所注册的菜单,此时需要重载插件刷新内存'];
	}

    /**
     * @param Model|Authenticatable|HasPermissions|null $user
     *
     * @return bool
     */
    protected function authorize($user): bool
    {
        return true;
    }

    /**
     * @return array
     */
    protected function parameters()
    {
        return [];
    }
}
