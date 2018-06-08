<?php
$id = $arguments['id'];

$name = "a11y_menu_options[$id]";
?>


<input 
  name="<?php echo $name; ?>" 
  id="<?php echo $name ?>" 
  type="<?php echo $arguments['type']; ?>" 
  placeholder="<?php echo $arguments['placeholder']; ?>"
  value="<?php echo $value ?>" />