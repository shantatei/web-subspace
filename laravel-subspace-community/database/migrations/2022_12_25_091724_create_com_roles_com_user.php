<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('com_roles_com_users', function (Blueprint $table) {
            //added the statement below after changing to digital ocean db
            Illuminate\Support\Facades\DB::statement('SET SESSION sql_require_primary_key=0');
            $table->primary(['com_roles_id', 'com_users_id']);
            $table->foreignId('com_roles_id')->constrained()->cascadeOnDelete();
            $table->foreignId('com_users_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('com_roles_com_users');
    }
};
