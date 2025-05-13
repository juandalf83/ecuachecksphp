<?php

class Graphics {

  public function __construct() {}

  public function circle($color, $dimension, $stroke, $stroke_color){
    $svg = '<svg height="'.$dimension.'" width="'.$dimension.'" viewBox="0 0 10 10">
        <circle r="3" cx="5" cy="5" fill="'.$color.'"
            stroke="'.$stroke_color.'"
            stroke-width="'.$stroke.'"
        />
    </svg>';
    return $svg;
  }

  public function check($dimension, $color){
    $svg ='<svg height="'.$dimension.'" width="'.$dimension.'" viewBox="0 0 10 10">
        <polygon points="0,6 1,5 4,8 10,2 10,4 4,10 0,6"
            fill="'.$color.'"
        />
    </svg>';
    return $svg;
  }

  public function pieChart($percentage, $color, $dimension, $stroke, $valor_aparte = '0', $prefix = ''){
    $cValue = $dimension/2;
    $ratio = $cValue - 10;
    $lenght_circle = 2 * $ratio * 3.14;
    $value_percentaje = ($percentage * $lenght_circle)/100;
    $value_percentaje1 = (100 * $lenght_circle)/100;
    $sizeFont = $dimension/4;
    if($dimension < 60){
      $sizeFont = $dimension/5;
    }
    $sizeLetter = ($sizeFont*0.3)/0.5;
    $yText = '58%';
    
    $width = $dimension;
    if($valor_aparte != '0' || $prefix != ''){
        $percentage = $valor_aparte;
    }

    $value = rtrim($percentage, '\'');
    if($prefix != ''){
      $value .= $prefix; 
    }
    $sizeText = strlen($value) * $sizeLetter;
    $pointChar = 0;
    if(strpos($value, '.') !== false){
      $pointChar = 2;
    }
    $xText = $cValue - ($sizeText/2) + $pointChar;
    
    $svg = '<svg height="'.$dimension.'" width="'.$width.'" style="border: solid 1px black">
        <circle r="'.$ratio.'" cx="'.$cValue.'" cy="'.$cValue.'" fill="transparent"
                stroke="#f7f7f7"
                stroke-width="'.$stroke.'"
                stroke-dasharray="'.$value_percentaje1.' '.$lenght_circle.'"
        />
        <circle r="'.$ratio.'" cx="'.$cValue.'" cy="'.$cValue.'" fill="transparent"
                stroke="'.$color.'"
                stroke-width="'.$stroke.'"
                stroke-linecap="round" 
                stroke-dasharray="'.$value_percentaje.' '.$lenght_circle.'"
        />
        <text x="'.$xText.'" y="'.$yText.'" fill="'.$color.'"
            font-family="poppins"
            font-weight="bold"
            font-size="'.$sizeFont.'"
        >'.$percentage.$prefix.'</text>';
    $svg .= '</svg>';
    return $svg;
  }

  public function identifierTest($color, $text){
    $chart_array = str_split($text);
    $svg = '<svg height="80" width="25" viewBox="0 0 25 80">
        <rect x="0" y="0" width="25" height="80" rx="2" ry="2" fill="'.$color.'"/>
        <text x="8" y="30" fill="white" font-size="15">'.$chart_array[0].'</text>
        <text x="8" y="45" fill="white" font-size="15">'.$chart_array[1].'</text>
        <text x="8" y="60" fill="white" font-size="15">'.$chart_array[2].'</text>
    </svg>';
    return $svg;
  }

  public function markTest($color){
    $svg = '<svg height="5" width="25" viewBox="0 0 25 5">
        <rect x="0" y="0" width="25" height="5" fill="'.$color.'"/>
    </svg>';
    return $svg;
  }

  public function abbreviationTest($color, $text){
    $svg = '<svg height="15" width="40" viewBox="0 0 40 15">
        <rect x="0" y="0" width="40" height="15" rx="2" ry="2" fill="'.$color.'"/>
        <text x="7" y="12.5" fill="white" font-size="13" font-family="poppins" font-weight="bold">'.$text.'</text>
    </svg>';
    return $svg;
  }
}