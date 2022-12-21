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
        //Pivot Table
        Schema::create('community_user_role', function (Blueprint $table) {
            $table->primary(['community_role_id', 'community_user_id']);
            $table->foreignId('community_role_id')->constrained()->cascadeOnDelete();
            $table->foreignId('community_user_id')->constrained()->cascadeOnDelete();
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
        Schema::dropIfExists('community_user_role');
    }
};
