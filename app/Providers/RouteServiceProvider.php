<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            // api
            Route::prefix('api')
                ->name('api.')
                ->middleware("api-login")
                ->namespace($this->namespace)
                ->group(base_path('routes/api-login.php'));
            Route::prefix('api/open')
                ->name('api.open.')
                ->middleware("api")
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));
            // 默认
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
            // admin
            Route::middleware(['web', 'auth'])
                ->prefix('admin')
                ->name('admin.')
                ->namespace($this->namespace)
                ->group(base_path('routes/admin.php'));
            // users
            Route::middleware(['web', 'auth'])
                ->prefix('users')
                ->name('users.')
                ->namespace($this->namespace)
                ->group(base_path('routes/users.php'));
            // whole
            Route::middleware(['web'])
                ->prefix('w')
                ->name('public.')
                ->namespace($this->namespace)
                ->group(base_path('routes/whole.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
