<?php
// include
require get_template_directory() . '/cpt/photo.php';
require get_template_directory() . '/cpt/center.php';
require get_template_directory() . '/cpt/product.php';

// jwt auth valid token option
add_filter(
	'jwt_auth_valid_token_response',
	function ($response, $user, $token, $payload) {
		$response = array(
			'success'    => true,
			'statusCode' => 200,
			'code'       => 'jwt_auth_valid_token',
			'message'    => __('Token is valid', 'jwt-auth'),
			'data'       => array(
				'id'          => $user->ID,
        'slug'    		=> $user->user_login,
				'name' 				=> $user->display_name,
        'email'       => $user->user_email,
        'url'       	=> $user->user_url,
        'description' => $user->description,
				'avatar'      => get_avatar_url($user->ID),
			),
		);
		return $response;
	},
	10,
	4
);