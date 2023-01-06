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

        DB::table('categories')->insert([
            'category_name' => 'Anime',
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Question',
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Spoiler',
        ]);

    }
}
