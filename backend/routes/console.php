<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\File;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('schema:audit', function () {
    $tables = DB::select('SELECT name FROM sqlite_master WHERE type="table" AND name NOT LIKE "sqlite_%"');
    $report = [];

    foreach ($tables as $table) {
        $columns = [];
        foreach (Schema::getColumns($table->name) as $column) {
            $columns[$column['name']] = [
                'type' => $column['type_name'],
                'nullable' => $column['nullable'],
                'default' => $column['default'],
            ];
        }

        $report[$table->name] = [
            'columns' => $columns,
            'indexes' => Schema::getIndexes($table->name),
            'foreign_keys' => Schema::getForeignKeys($table->name),
            'differences' => [],
        ];
    }

    $path = storage_path('app/reports');
    File::ensureDirectoryExists($path);
    File::put($path.'/schema_audit.json', json_encode($report, JSON_PRETTY_PRINT));
    $this->info('Schema audit written to storage/app/reports/schema_audit.json');
})->purpose('Generate a schema audit report');
