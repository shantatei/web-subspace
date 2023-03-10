<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\ComUsers;
use App\Models\ComRoles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class CommunityController extends Controller

{


    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => ['showCommunity', 'UsersInCommunity', 'checkUser', 'getCommunityById', 'getCommunityByUserId']]);
    }

    //Show All Community

    public function showCommunity()
    {
        return  Community::all();
    }

    //Create New Community
    public function createCommunity(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'about' => 'required|string',
            'community_image_filename' => 'image|mimes:jpg,png,bmp,jpeg',
            'community_image_url' => 'string',
            'community_banner_filename' => 'image|mimes:jpg,png,bmp,jpeg',
            'community_banner_url' => 'string',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 400);
        }

        //check if request has File

        if ($request->hasFile('community_banner_filename') && $request->hasFile('community_image_filename')) {
            $bannerpath = $request->community_banner_filename->store('community_banner', 's3');

            Storage::disk('s3')->setVisibility($bannerpath, 'public');

            $bannerurl = Storage::disk('s3')->url($bannerpath);

            $imagepath = $request->community_image_filename->store('community_images', 's3');

            Storage::disk('s3')->setVisibility($imagepath, 'public');

            $imageurl = Storage::disk('s3')->url($imagepath);

            $community = new Community();
            $community->community_banner_filename = $bannerpath;
            $community->community_banner_url = $bannerurl;
            $community->community_image_filename = $imagepath;
            $community->community_image_url = $imageurl;
            $community->name = $request->name;
            $community->about = $request->about;
        } elseif ($request->hasFile('community_image_filename')) {

            $path = $request->community_image_filename->store('community_images', 's3');

            Storage::disk('s3')->setVisibility($path, 'public');

            $url = Storage::disk('s3')->url($path);

            $community = new Community();
            $community->community_image_filename = $path;
            $community->community_image_url = $url;
            $community->name = $request->name;
            $community->about = $request->about;
        } elseif ($request->hasFile('community_banner_filename')) {
            $path = $request->community_banner_filename->store('community_banner', 's3');

            Storage::disk('s3')->setVisibility($path, 'public');

            $url = Storage::disk('s3')->url($path);

            $community = new Community();
            $community->community_banner_filename = $path;
            $community->community_banner_url = $url;
            $community->name = $request->name;
            $community->about = $request->about;
        } else {
            $community = new Community();
            $community->name = $request->name;
            $community->about = $request->about;
        }

        $community->save();

        $community_owner = new ComUsers();
        $community_owner->user_id = $request->user_id;
        $community_owner->community_id = $community->id;

        $community_owner->save();

        $role = ComRoles::where('role_name', 'Owner')->first();


        $community_owner->roles()->attach($role->id);

        $community_owner->roles;

        return response()->json(
            [
                'status' => true,
                'community' => $community,
                'community_owner' => $community_owner
            ]
        );
    }

    public function joinCommunity(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 400);
        }

        $checkJoinedCom = ComUsers::where('community_id', $request->community_id)
            ->where('user_id', $request->user_id)->first();

        if ($checkJoinedCom) {
            return response()->json([
                'message' => 'You have already joined this community',
            ], 200);
        }

        $community = Community::where('id', $request->community_id)->first();

        if ($community) {

            $community_user = new ComUsers();
            $community_user->user_id = $request->user_id;
            $community_user->community_id = $request->community_id;

            $community_user->save();

            $role = ComRoles::where('role_name', 'User')->first();


            $community_user->roles()->attach($role->id);

            $community_user->roles;
        } else {

            return response()->json([
                'message' => 'No Such Community !',
            ], 403);
        }

        return response()->json(
            [
                'status' => true,
                'community_user' => $community_user
            ]
        );
    }

    public function editCommunity(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
            'name' => 'required|string',
            'about' => 'required|string',
            'community_image_filename' => 'image|mimes:jpg,png,bmp,jpeg',
            'community_image_url' => 'string',
            'community_banner_filename' => 'image|mimes:jpg,png,bmp,jpeg',
            'community_banner_url' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 400);
        }


        $community = Community::where('id', $request->community_id)->first();
        $community_user = ComUsers::where('community_id', $request->community_id)->where('user_id', $request->user_id)->first();
        if ($community_user) {

            if ($community_user->roles()->where('role_name', '=', 'Owner')->exists()) {

                //check if request has File

                if ($request->hasFile('community_banner_filename') && $request->hasFile('community_image_filename')) {
                    if ($community->community_image_filename) {
                        $old_image_path = $community->community_image_filename;
                        if (Storage::disk('s3')->exists($old_image_path)) {
                            Storage::disk('s3')->delete($old_image_path);
                        }
                    }

                    if ($community->community_banner_filename) {
                        $old_banner_path = $community->community_banner_filename;
                        if (Storage::disk('s3')->exists($old_banner_path)) {
                            Storage::disk('s3')->delete($old_banner_path);
                        }
                    }

                    $imagepath = $request->community_image_filename->store('community_images', 's3');

                    Storage::disk('s3')->setVisibility($imagepath, 'public');

                    $imageurl = Storage::disk('s3')->url($imagepath);

                    $bannerpath = $request->community_banner_filename->store('community_banner', 's3');

                    Storage::disk('s3')->setVisibility($bannerpath, 'public');

                    $bannerurl = Storage::disk('s3')->url($bannerpath);

                    $community->update([
                        'name' => $request->name,
                        'about' => $request->about,
                        'community_image_url' => $imageurl,
                        'community_image_filename' => $imagepath,
                        'community_banner_url' => $bannerurl,
                        'community_banner_filename' => $bannerpath,
                    ]);
                } elseif ($request->hasFile('community_image_filename')) {
                    if ($community->community_image_filename) {
                        $old_path = $community->community_image_filename;
                        if (Storage::disk('s3')->exists($old_path)) {
                            Storage::disk('s3')->delete($old_path);
                        }
                    }

                    $imagepath = $request->community_image_filename->store('community_images', 's3');

                    Storage::disk('s3')->setVisibility($imagepath, 'public');

                    $imageurl = Storage::disk('s3')->url($imagepath);

                    $community->update([
                        'name' => $request->name,
                        'about' => $request->about,
                        'community_image_url' => $imageurl,
                        'community_image_filename' => $imagepath,
                    ]);
                } elseif ($request->hasFile('community_banner_filename')) {
                    if ($community->community_banner_filename) {
                        $old_path = $community->community_banner_filename;
                        if (Storage::disk('s3')->exists($old_path)) {
                            Storage::disk('s3')->delete($old_path);
                        }
                    }

                    $bannerpath = $request->community_banner_filename->store('community_banner', 's3');

                    Storage::disk('s3')->setVisibility($bannerpath, 'public');

                    $bannerurl = Storage::disk('s3')->url($bannerpath);

                    $community->update([
                        'name' => $request->name,
                        'about' => $request->about,
                        'community_banner_url' => $bannerurl,
                        'community_banner_filename' => $bannerpath,
                    ]);
                } else {

                    $community->update($validator->validated());
                }

                return response()->json([
                    'message' => 'Community Successfully Updated',
                    'community_user' => $community_user,
                    'community' => $community
                ], 200);
            } else {
                return response()->json([
                    'message' => 'You are not the Owner',
                ]);
            }
        } else {

            return response()->json([
                'message' => 'No Community Found',
            ], 403);
        }
    }

    public function UsersInCommunity($id)
    {

        $community = Community::where('id', $id)->first();
        $community_users = ComUsers::with(['roles'])->where('community_id', $id)->get();

        $members_count = sizeof($community_users);
        if ($community) {

            foreach ($community_users as $community_user => $user_member) {
                $userId = $user_member->user_id;
                $user = Http::get("http://laravel-subspace-authentication:80/api/auth/profile/$userId");
                $user_array = $user->json();
                $user_member->user = $user_array;
            }

            return response()->json([
                'message' => 'List of Users In This Community',
                'community_users' => $community_users,
                'members_count' => $members_count,
                'community' => $community,
            ], 200);
        } else {

            return response()->json([
                'message' => 'No Such Community !',
            ], 403);
        }
    }

    public function deleteCommunity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $community = Community::where('id', $request->community_id)->first();
        $community_user = ComUsers::where('community_id', $request->community_id)->where('user_id', $request->user_id)->first();
        if ($community_user) {

            if ($community_user->roles()->where('role_name', '=', 'Owner')->exists()) {

                if ($community->community_image_filename) {
                    $old_image_path = $community->community_image_filename;
                    if (Storage::disk('s3')->exists($old_image_path)) {
                        Storage::disk('s3')->delete($old_image_path);
                    }
                }

                if ($community->community_banner_filename) {
                    $old_banner_path = $community->community_banner_filename;
                    if (Storage::disk('s3')->exists($old_banner_path)) {
                        Storage::disk('s3')->delete($old_banner_path);
                    }
                }

                $community->delete();
                return response()->json([
                    'message' => 'Community Deleted successfully',
                    'community' => $community
                ]);
            } else {
                return response()->json([
                    'message' => 'You are not the Owner',
                ]);
            }
        } else {

            return response()->json([
                'message' => 'No Community Found',
            ], 403);
        }
    }

    public function leaveCommunity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $community = Community::where('id', $request->community_id)->first();
        $community_user = ComUsers::where('community_id', $request->community_id)->where('user_id', $request->user_id)->first();
        if ($community) {
            if ($community_user) {

                if ($community_user->roles()->where('role_name', '=', 'Owner')->exists()) {


                    return response()->json([
                        'message' => 'You are the owner, you cannot leave your own community !',
                    ]);
                } else {
                    $community_user->delete();
                    return response()->json([
                        'message' => 'You have left the community successfully',
                        'community_user' => $community_user,
                        'community' => $community
                    ]);
                }
            } else {

                return response()->json([
                    'message' => 'No user found in requested community',
                ], 403);
            }
        } else {

            return response()->json([
                'message' => 'No Community Found',
            ], 403);
        }
    }

    public function checkUser(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'community_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ], 400);
        }

        $community_user = ComUsers::where('community_id', $request->community_id)->where('user_id', $request->user_id)->first();

        if ($community_user) {

            $community_user->roles;
            return $community_user;
        } else {

            return response()->json([
                'message' => 'No user found in requested community',
            ], 403);
        }
    }

    public function getCommunityById($id)
    {
        $community = Community::where('id', $id)->first();

        if ($community) {
            return $community;
        } else {
            return response()->json([
                'message' => 'No Community Found',
            ], 403);
        }
    }

    public function getCommunityByUserId($id)
    {
        $communities_joined = ComUsers::with(['roles'])->where('user_id', $id)->get();
        if (sizeof($communities_joined) === 0) {
            return response()->json([
                'message' => 'This user has yet to join any community',
            ], 403);
        } else {
            $communities_user_owned = array();
            $communities_user_joined = array();
            foreach ($communities_joined as $community_joined => $user_community) {
                if ($user_community->roles()->where('role_name', '=', 'Owner')->exists()) {
                    $communityId = $user_community->community_id;
                    $community = Http::get("http://laravel-subspace-community:80/api/communityById/$communityId");
                    $community_array = $community->json();
                    $user_community->community = $community_array;
                    array_push($communities_user_owned, $user_community);
                } else {
                    $communityId = $user_community->community_id;
                    $community = Http::get("http://laravel-subspace-community:80/api/communityById/$communityId");
                    $community_array = $community->json();
                    $user_community->community = $community_array;
                    array_push($communities_user_joined, $user_community);
                }
            }
            return response()->json([
                'communities_joined' => $communities_user_joined,
                'communities_owned' => $communities_user_owned
            ], 200);
        }
    }
}
