<?php
// This file is generated. Do not modify it manually.
return array(
	'custom-charts' => array(
		'apiVersion' => 2,
		'name' => 'custom/bar-chart',
		'title' => 'Chart',
		'category' => 'widgets',
		'icon' => 'chart-area',
		'description' => 'Enter numeric values and render them in a bar chart.',
		'attributes' => array(
			'values' => array(
				'type' => 'string',
				'default' => ''
			),
			'barColors' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'chartType' => array(
				'type' => 'string',
				'default' => 'bar'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
