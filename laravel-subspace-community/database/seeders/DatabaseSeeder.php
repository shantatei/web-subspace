<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('com_roles')->insert([
            'role_name' => 'Owner',
        ]);

        DB::table('com_roles')->insert([
            'role_name' => 'Moderator',
        ]);

        DB::table('com_roles')->insert([
            'role_name' => 'User',
        ]);
    }
}
