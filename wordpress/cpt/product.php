<?php
// Custom Post Type
function cpt_product()
{
  $cpt_name = '상품';
  $cpt_slug = 'cpt_product';
  $labels = [
    "name" => __($cpt_name),
    "singular_name" => __($cpt_name),
    "all_items" => __($cpt_name . " 목록"),
  ];
  $args = [
    "label" => __($cpt_name),
    "labels" => $labels,
    "description" => "",
    "public" => true,
    "publicly_queryable" => true,
    "show_ui" => true,
    "show_in_rest" => true,
    "rest_base" => "",
    "rest_controller_class" => "WP_REST_Posts_Controller",
    "has_archive" => true,
    "show_in_menu" => true,
    "show_in_nav_menus" => true,
    "delete_with_user" => false,
    "exclude_from_search" => false,
    "capability_type" => "post",
    "map_meta_cap" => true,
    "hierarchical" => false,
    "rewrite" => ["slug" => $cpt_slug, "with_front" => true],
    "query_var" => true,
    "menu_icon" => "dashicons-carrot",
    "supports" => ['title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments'],
    'cptp_permalink_structure' => '%post_id%',
    'taxonomies' => array('post_tag'),
  ];
  register_post_type($cpt_slug, $args);
}
add_action('init', 'cpt_product');

// Custom Taxonomy
function tax_product()
{
  $cpt_name = '상품';
  $cpt_slug = 'cpt_product';
  $tax_slug = str_replace('cpt_', '', $cpt_slug);
  $labels = [
    "name" => __($cpt_name . " 카테고리"),
    "singular_name" => __($cpt_name . " 카테고리"),
  ];
  $args = [
    "label" => __($cpt_name . " 카테고리"),
    "labels" => $labels,
    "public" => true,
    "publicly_queryable" => true,
    "hierarchical" => true,
    "show_ui" => true,
    "show_in_menu" => true,
    "show_in_nav_menus" => true,
    "query_var" => true,
    "rewrite" => ['slug' => 'tax_' . $tax_slug, 'with_front' => true,],
    "show_admin_column" => false,
    "show_in_rest" => true,
    "rest_base" => "tax_" . $tax_slug,
    "rest_controller_class" => "WP_REST_Terms_Controller",
    "show_in_quick_edit" => false,
  ];
  register_taxonomy("tax_" . $tax_slug, [$cpt_slug], $args);
}
add_action('init', 'tax_product');
