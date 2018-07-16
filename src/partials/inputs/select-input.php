<?php
// if for some reason no options are passed in, don't print the field.
if (!$arguments['options']) {
  echo "<strong>No options are available.</strong>";
}

$name = "a11y_menu_options[$id]";

?>

<select 
  name="<?php echo $name; ?>"
  id="<?php echo $name; ?>"
>
<?php
  // create option tags for each of the options
  foreach($arguments['options'] as $key => $option) {
?>
    <option value="<?php echo $key; ?>" <?php selected($value, $key); ?>>
      <?php echo $option; ?>  
    </option>
<?php
  }
?>
</select>