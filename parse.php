<?php

$arr = array();
$somePath = '/Applications/MAMP/htdocs/search-icons/svgs';
$dirs = glob($somePath . '/*', GLOB_ONLYDIR);

$id = 1;
foreach ($dirs as $dir) {

  $name = explode('/', $dir);

  if (is_dir($dir)) {
    if ($handle = opendir($dir)) {
      while (($file = readdir($handle)) !== FALSE) {
        if ($file != "." && $file != "..") {
          $str = file_get_contents($dir . '/' . $file);
          $substr = "<!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->";
          $arr[current(explode('.', $file))] = str_replace($substr, "", $str);

          $id++;
        }
      }
      closedir($handle);
    }
  }

  $icons_json = json_encode($arr);
  file_put_contents(__DIR__ . '/' . array_pop($name) . '.json', $icons_json);

  $arr = [];
}
