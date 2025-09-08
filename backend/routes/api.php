<?php

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

// ==========================
// A) Public routes
// ==========================

// Authentication
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public data
Route::get('/search-court', [CourtSearchController::class, 'index']);
Route::get('/clients/search', [DashboardController::class, 'getClientByNameOrPhoneNumber'])->name('client.search');

// ==========================
// B) Protected routes (auth:sanctum)
// ==========================
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);
    Route::get('/auth/verify', [AuthController::class, 'verify']);

    // User
    Route::put('/user/{user}', [UserController::class, 'updateProfile'])->name('user.update');
    Route::get('/user/{user}', [UserController::class, 'getUserDetails'])->name('user.details');

    // Notifications & Events
    Route::get('/notifications/{userId}', [NotificationController::class, 'index']);
    Route::post('/notifications/{notificationId}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notification', [NotificationController::class, 'store']);
    Route::get('/events', [EventController::class, 'index']);
    Route::post('/event', [EventController::class, 'store']);

    // Resources
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('unclients', UnclientController::class);
    Route::apiResource('lawyers', LawyerController::class);
    Route::apiResource('courts', CourtController::class);
    Route::apiResource('court_types', CourtTypeController::class);
    Route::apiResource('court_levels', CourtLevelController::class);
    Route::apiResource('legal-cases', LegCaseController::class);
    Route::apiResource('case_types', CaseTypeController::class);
    Route::apiResource('case_sub_types', CaseSubTypeController::class);
    Route::apiResource('procedure_types', ProcedureTypeController::class);
    Route::apiResource('procedure_place_types', ProcedurePlaceTypeController::class);
    Route::apiResource('expense_categories', ExpenseCategoryController::class);
    Route::apiResource('procedures', ProcedureController::class);
    Route::apiResource('services', ServiceController::class);

    // Home
    Route::get('/all_count_office', [HomeController::class, 'countOffice']);
    Route::get('/client-search', [HomeController::class, 'searchClient']);
    Route::get('/leg-case-search', [HomeController::class, 'searchLegCase']);

    // Unclients search
    Route::get('unclients-search', [UnclientController::class, 'getUnclientSearch']);

    // Courts Setting
    Route::get('/court-types/{courtTypeId}', [CourtTypeController::class, 'getCourtTypesWithSubTypes']);

    // LegCase helpers
    Route::get('legal-case/case-types-sub-types', [LegCaseController::class, 'getCaseTypesWithCaseSubTypes']);
    Route::get('/case-types/{caseTypeId}/sub-types', [CaseTypeController::class, 'getCaseTypesWithSubTypes'])->name('case-sub-types.index');
    Route::get('legal-case-search', [LegCaseController::class, 'getLegCaseSearch']);
    Route::post('/legal-cases/{legCaseId}/add_clients', [LegCaseController::class, 'addClients']);
    Route::delete('/legal-cases/{legCaseId}/clients/{clientId}', [LegCaseController::class, 'delete']);
    Route::post('/legal-cases/add_courts', [LegCaseController::class, 'AddLegCaseCourts']);
    Route::delete('/leg-case/remove-court', [LegCaseController::class, 'RemoveCourtFromLegCase']);

    // Legal Ads
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

    // Service utilities
    Route::get('service-search', [ServiceController::class, 'getServiceSearch']);
    Route::get('service-types', [ServiceController::class, 'getServiceTypes']);

    // Procedure Services
    Route::get('/service-procedures/{serviceId}', [ServiceProcedureController::class, 'index']);
    Route::post('/service-procedures', [ServiceProcedureController::class, 'store']);
    Route::put('/service-procedure/{id}', [ServiceProcedureController::class, 'update']);
    Route::delete('/service-procedure/{id}', [ServiceProcedureController::class, 'destroy']);

    // Court Search helpers
    Route::get('/court-search/degrees', [CourtSearchController::class, 'getDegrees']);
    Route::post('/court-search/courts', [CourtSearchController::class, 'getCourts']);
    Route::get('/court-search/case-types', [CourtSearchController::class, 'getCaseTypes']);

    // Procedures Search Filters
    Route::get('/procedures-search', [ProcedureSearchController::class, 'searchFilters']);
    Route::get('/fetch-degrees', [CaseStatusController::class, 'fetchDegrees']);
    Route::get('/get-court-options', [CaseStatusController::class, 'getCourtOptions']);
    Route::get('/get-case-type-options', [CaseStatusController::class, 'getCaseTypeOptions']);
    Route::get('/get-case-year-options', [CaseStatusController::class, 'getCaseYearOptions']);
    Route::get('/get-case-details', [CaseStatusController::class, 'getCaseDetails']);

    // Expenses
    Route::get('/expenses/search', [ExpenseController::class, 'searchExpenses']);
    Route::get('/expense_categories', [ExpenseCategoryController::class, 'index']);
});

// ==========================
// C) Optional email verification
// ==========================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
    Route::post('auth/email/verify/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');
});
