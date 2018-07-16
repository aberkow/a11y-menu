<?php
$id = $arguments['id'];

$name = "a11y_menu_options[$id]";
?>

<textarea 
  name="<?php echo $name; ?>" 
  id="<?php echo $name; ?>"
  rows="10"
  cols="100" >
<?php echo $value; ?>
</textarea>