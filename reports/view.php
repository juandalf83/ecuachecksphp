<?php

class View{
  public static function print_view($template, $data = array())
  {
      ob_start();
          extract($data);
          require($template);
          $result = ob_get_contents();
      ob_end_clean();

      return $result;
  }
}
