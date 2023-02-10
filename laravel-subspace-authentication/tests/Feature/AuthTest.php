<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function getAuthHeaders()
    {
        $response = Http::post('http://127.0.0.1:8000/api/auth/login', [
            'email' => 'peacock@gmail.com',
            'password' => 'password'
        ]);

        return [
            'Authorization' => 'Bearer ' . $response->json()['token']
        ];
    }

    public function getTestAuthHeaders()
    {
        $response = Http::post('http://127.0.0.1:8000/api/auth/login', [
            'email' => 'testuser@gmail.com',
            'password' => 'password'
        ]);

        return [
            'Authorization' => 'Bearer ' . $response->json()['token']
        ];
    }

    public function test_login_with_missing_data()
    {
        $response = $this->post('/api/auth/login', [
            'email' => '',
            'password' => ''
        ]);

        $response->assertStatus(400);
        $response->assertJsonStructure([
            'email',
            'password'
        ]);
    }

    public function test_login_with_invalid_credentials()
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'peacock@gmail.com',
            'password' => 'wrongpassword'
        ]);

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'error',
        ]);
    }

    public function test_login_with_valid_credentials()
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'peacock@gmail.com',
            'password' => 'password'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'token',
            'token_type',
            'token_validity',
            'user',
        ]);
    }

    public function test_register_with_missing_data()
    {
        $response = $this->post('/api/auth/register', [
            'username' => "",
            'email' => '',
            'password' => '',
            'password_confirmation' => ''
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            [
                'username',
                'email',
                'password'
            ]
        ]);
    }

    public function test_register_with_invalid_data()
    {
        $response = $this->post('/api/auth/register', [
            'username' => "testuser",
            'email' => 'testuser',
            'password' => 'password',
            'password_confirmation' => 'wrongpassword'
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            [
                'email',
                'password'
            ]
        ]);
    }

    public function test_register_with_valid_data()
    {
        $response = $this->post('/api/auth/register', [
            'username' => "testuser",
            'email' => 'testuser@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'user'
        ]);

    }

    public function test_logout_without_token()
    {
        $response = $this->post('/api/auth/logout');

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message'
        ]);
    }

    public function test_logout_with_token()
    {
        $response = $this->post('/api/auth/logout', [], $this->getAuthHeaders());

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message'
        ]);
    }


    public function test_edit_account_without_token()
    {
        $response = $this->put('/api/auth/editUser');

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message'
        ]);
    }

    public function test_edit_account_with_token()
    {
        $response = $this->put('/api/auth/editUser', [
            'username'=>'peacock',
            'email' => 'peacock@gmail.com'
        ], $this->getAuthHeaders());

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'user'
        ]);
    }


    public function test_change_password_without_token()
    {
        $response = $this->post('/api/auth/change-password');

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message'
        ]);
    }

    public function test_change_password_with_invalid_old_password()
    {
        $response = $this->post('/api/auth/change-password', [
            'old_password' => 'oldpassword',
            'password' => 'password',
            'confirm_password' => 'password'
        ], $this->getAuthHeaders());

        $response->assertStatus(400);
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_change_password_with_invalid_confirm_password()
    {
        $response = $this->post('/api/auth/change-password', [
            'old_password' => 'password',
            'password' => 'password',
            'confirm_password'=>'newpassword'
        ], $this->getAuthHeaders());

        $response->assertStatus(400);
        $response->assertJsonStructure([
            'message',
            'error' => [
                'confirm_password'
            ]
        ]);
    }

    public function test_change_password_with_valid_data()
    {
        $response = $this->post('/api/auth/change-password', [
            'old_password' => 'password',
            'password' => 'password',
            'confirm_password'=>'password'
        ], $this->getAuthHeaders());

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message'
        ]);
    }

    public function test_delete_without_token()
    {
        $response = $this->delete('/api/auth/deleteUser');

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message'
        ]);
    }

    public function test_delete_with_wrong_password()
    {
        $response = $this->delete('/api/auth/deleteUser', [
            'password' => 'wrongpassword',
        ], $this->getTestAuthHeaders());

        $response->assertStatus(400);
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_delete_with_token()
    {
        $response = $this->delete('/api/auth/deleteUser', [
            'password' => 'password',
        ], $this->getTestAuthHeaders());

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'user'
        ]);
    }
}
