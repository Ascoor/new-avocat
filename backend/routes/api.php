<?php

use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\Api\Admin\AdminEventController;
use App\Http\Controllers\Api\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Api\Admin\WebsiteActivityController as AdminWebsiteActivityController;
use App\Http\Controllers\Api\Website\WebsiteActivityController as PublicWebsiteActivityController;
use App\Http\Controllers\Api\Admin\WebsiteReportController;
use App\Http\Controllers\Api\Website\AchievementController;
use App\Http\Controllers\Api\Website\ArticleController;
use App\Http\Controllers\Api\Website\PageController;
use App\Http\Controllers\Api\Website\TeamController;
use App\Http\Controllers\Api\Website\UploadController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CaseStatusController;
use App\Http\Controllers\CaseSubTypeController;
use App\Http\Controllers\CaseTypeController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UnclientController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\CourtLevelController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CourtSearchController;
use App\Http\Controllers\CourtTypeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LegalDocToolsController;
use App\Http\Controllers\LegalDocArchiveController;
use App\Http\Controllers\LawyerController;
use App\Http\Controllers\LegCaseController;
use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\ProcedureTypeController;
use App\Http\Controllers\ProcedurePlaceTypeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\LegalSessionController;
use App\Http\Controllers\LegalSessionTypeController;
use App\Http\Controllers\LegalAdController;
use App\Http\Controllers\LegalAdTypeController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProcedureSearchController;
use App\Http\Controllers\ServiceProcedureController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');
Route::get('/auth/verify', [AuthController::class, 'verify'])->middleware('auth:sanctum');

// Email verification
Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
    Route::post('auth/email/verify/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');

    Route::put('/user/{user}', [UserController::class, 'updateProfile'])->name('user.update');
    Route::get('/user/{user}', [UserController::class, 'getUserDetails'])->name('user.details');
});

Route::prefix('admin')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/auth/me', AdminAuthController::class);

        Route::middleware('role:admin')->group(function () {
            Route::get('/website/activity', AdminWebsiteActivityController::class);
            Route::get('/website/report', WebsiteReportController::class);
        });
    });

Route::get('/admin/events/subscribe', [AdminEventController::class, 'subscribe']);

// Website activity (public)
Route::get('/website/activity', PublicWebsiteActivityController::class);

// Dashboard & searches
Route::get('/search-court', [CourtSearchController::class, 'index']);
Route::get('/clients/search', [DashboardController::class, 'getClientByNameOrPhoneNumber'])->name('client.search');
Route::get('unclients-search', [UnclientController::class, 'getUnclientSearch']);

// Resources
Route::apiResources([
    'clients' => ClientController::class,
    'unclients' => UnclientController::class,
    'lawyers' => LawyerController::class,
    'courts' => CourtController::class,
    'court_types' => CourtTypeController::class,
    'court_levels' => CourtLevelController::class,
    'legal-cases' => LegCaseController::class,
    'case_types' => CaseTypeController::class,
    'case_sub_types' => CaseSubTypeController::class,
    'procedure_types' => ProcedureTypeController::class,
    'procedure_place_types' => ProcedurePlaceTypeController::class,
    'expense_categories' => ExpenseCategoryController::class,
    'procedures' => ProcedureController::class,
    'services' => ServiceController::class,
]);
 
        # Lawyer routes use LawyerController (store -> create->show->update->destroy)
        Route::get('lawyer/{lawyer}', [LawyerController::class, 'show']);
        Route::put('lawyer/{lawyer}', [LawyerController::class, 'update']);
        Route::delete('lawyer/{lawyer}', [LawyerController::class, 'destroy']);
        // Home
        Route::get('/all_count_office', [HomeController::class, 'countOffice']);
        Route::get('/client-search', [HomeController::class, 'searchClient']);
        Route::get('/leg-case-search', [HomeController::class, 'searchLegCase']);

        // unclients 
        Route::get('unclients-search', [UnclientController::class, 'getUnclientSearch']);

        // Courts Setting
        Route::get('/court-types/{courtTypeId}', [CourtTypeController::class, 'getCourtTypesWithSubTypes']);
        // Create LegCase
        Route::get('legal-case/case-types-sub-types', [LegCaseController::class, 'getCaseTypesWithCaseSubTypes']);
        Route::get('/case-types/{caseTypeId}/sub-types', [CaseTypeController::class, 'getCaseTypesWithSubTypes'])->name('case-sub-types.index');
        Route::get('legal-case-search', [LegCaseController::class, 'getLegCaseSearch']);
        Route::post('/legal-cases/{legCaseId}/add_clients', [LegCaseController::class,'addClients']);
        
Route::delete('/legal-cases/{legCaseId}/clients/{clientId}', [LegCaseController::class, 'delete']);
        Route::post('/legal-cases/add_courts', [LegCaseController::class,'AddLegCaseCourts']);
        Route::delete('/leg-case/remove-court', [LegCaseController::class, 'RemoveCourtFromLegCase']);

        // Legal Ads
        // Get legal ads TypesRoute::get('/legal_ads', [LegalAdController::class, 'index']);
        Route::get('/legal-ads', [LegalAdController::class, 'index']);
        Route::get('/legal_ad_types', [LegalAdTypeController::class, 'index']);
        Route::post('/legal_ad_types', [LegalAdTypeController::class, 'store']);
        Route::get('/legal-ads/{legCaseId}', [LegalAdController::class, 'getByLegCaseId']);
        Route::post('/legal-ads', [LegalAdController::class, 'store']);
        Route::put('/legal-ads/{legalAdId}', [LegalAdController::class, 'update']);
        Route::delete('/legal-ads/{legalAdId}', [LegalAdController::class, 'destroy']);


            // Legal Sessions
            Route::get('/legal_sessions', [LegalSessionController::class, 'index']);
            Route::get('/legal_session_types', [LegalSessionTypeController::class, 'index']);
            Route::get('/case-status', [CaseStatusController::class, 'fetchCaseStatus']);
            Route::get('/legal_sessions/leg-case/{legCaseId}', [LegalSessionController::class, 'getSessionsByLegCaseId']);
            Route::get('/legal_sessions/court/{courtId}', [LegalSessionController::class, 'getByCourtId']);
            Route::get('/legal_sessions/lawyer/{lawyerId}', [LegalSessionController::class, 'getByLawyerId']);
            Route::post('/legal_sessions', [LegalSessionController::class, 'store']);
            Route::put('/legal_sessions/{id}', [LegalSessionController::class, 'update']);
            Route::delete('/legal_sessions/{id}', [LegalSessionController::class, 'destroy']);


        // Legal procedures
        Route::get('procedures/procedure-type/{procedureTypeId}', [ProcedureController::class, 'getByProcedureTypeId']);
        Route::get('procedures/leg-case/{legCaseId}', [ProcedureController::class, 'getByLegCaseId']);

        // Services
        Route::group(['prefix' => 'services'], function () {
            Route::get('/', [ServiceController::class, 'index']);
            Route::get('/{id}', [ServiceController::class, 'show']);
            Route::post('/', [ServiceController::class, 'store']);
            Route::put('/{id}', [ServiceController::class, 'update']);
            Route::delete('/{id}', [ServiceController::class, 'destroy']);
        });
        Route::get('service-search', [ServiceController::class, 'getServiceSearch']);
        Route::get('service-types', [ServiceController::class, 'getServiceTypes']);

        //Procedure Services

        Route::get('/service-procedures/{serviceId}', [ServiceProcedureController::class, 'index']);
        Route::post('/service-procedures', [ServiceProcedureController::class, 'store']);
        Route::put('/service-procedure/{id}', [ServiceProcedureController::class, 'update']);
        Route::delete('/service-procedure/{id}', [ServiceProcedureController::class, 'destroy']);

        // Court Search

        Route::get('/court-search/degrees', [CourtSearchController::class, 'getDegrees']);
        Route::post('/court-search/courts', [CourtSearchController::class, 'getCourts']);
        Route::get('/court-search/case-types', [CourtSearchController::class, 'getCaseTypes']);


        // Procedures Search Filters
        Route::get('/procedures-search', [ProcedureSearchController::class, 'searchFilters']);
        Route::get('/case-status', [CaseStatusController::class, 'index']);
        Route::get('/fetch-degrees', [CaseStatusController::class, 'fetchDegrees']);
        Route::get('/get-court-options', [CaseStatusController::class, 'getCourtOptions']);
        Route::get('/get-case-type-options', [CaseStatusController::class, 'getCaseTypeOptions']);
        Route::get('/get-case-year-options', [CaseStatusController::class, 'getCaseYearOptions']);
        Route::get('/get-case-details', [CaseStatusController::class, 'getCaseDetails']);

        // Expences
        Route::get('/expenses/search', [ExpenseController::class, 'searchExpenses']);
        Route::get('/expense_categories', [ExpenseCategoryController::class,'index']);

// Notifications
Route::get('notifications/{userId}', [NotificationController::class,'index']);
Route::post('notifications/{notificationId}/read', [NotificationController::class,'markAsRead']);
        Route::post('notification', [NotificationController::class,'store']);
        Route::post('event', [EventController::class,'store']);
        Route::get('/events', [EventController::class,'index']);

Route::prefix('website')->group(function () {
    Route::get('/pages/{slug}', [PageController::class, 'index']);
    Route::get('/team', [TeamController::class, 'index']);
    Route::get('/team/{team}', [TeamController::class, 'show']);
    Route::get('/achievements', [AchievementController::class, 'index']);
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/{article:slug}', [ArticleController::class, 'show']);

    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::post('/pages/{slug}', [PageController::class, 'update']);

        Route::apiResource('team', TeamController::class)->except(['index', 'show']);
        Route::apiResource('articles', ArticleController::class)->except(['index', 'show']);
        Route::apiResource('achievements', AchievementController::class)->except(['index']);

        Route::post('/upload', [UploadController::class, 'store']);
    });
});

Route::prefix('admin/website')
    ->middleware(['auth:sanctum', 'role:admin,editor'])
    ->group(function () {
        Route::get('/pages', [PageController::class, 'adminIndex']);
        Route::get('/pages/{slug}', [PageController::class, 'adminShow']);
        Route::put('/pages/{slug}', [PageController::class, 'adminUpdate']);
        Route::post('/pages/{slug}/preview', [PageController::class, 'preview']);
        Route::post('/pages/{slug}/publish', [PageController::class, 'publish']);
        Route::post('/pages/publish-all', [PageController::class, 'publishAll']);
        Route::post('/pages/{slug}/request-approval', [PageController::class, 'requestApproval']);
        Route::post('/pages/{slug}/approve', [PageController::class, 'approve']);
        Route::post('/pages/{slug}/schedule', [PageController::class, 'schedule']);
        Route::delete('/pages/{slug}/schedule', [PageController::class, 'cancelSchedule']);
        Route::get('/pages/{slug}/history', [PageController::class, 'history']);
        Route::get('/pages/publishing-queue', [PageController::class, 'publishingQueue']);
        Route::post('/upload', [UploadController::class, 'store']);
        Route::get('/settings', [PageController::class, 'settings']);
        Route::put('/settings', [PageController::class, 'updateSettings']);

        Route::apiResource('team', TeamController::class);
        Route::apiResource('achievements', AchievementController::class);

        Route::get('/articles', [ArticleController::class, 'index']);
        Route::post('/articles', [ArticleController::class, 'store']);
        Route::get('/articles/{article}', [ArticleController::class, 'show']);
        Route::put('/articles/{article}', [ArticleController::class, 'update']);
        Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);

        Route::get('/testimonials', [AdminTestimonialController::class, 'index']);
        Route::post('/testimonials', [AdminTestimonialController::class, 'store']);
        Route::get('/testimonials/{testimonial}', [AdminTestimonialController::class, 'show']);
        Route::put('/testimonials/{testimonial}', [AdminTestimonialController::class, 'update']);
        Route::delete('/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy']);
    });
