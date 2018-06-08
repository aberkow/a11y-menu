<div class="wrap">
  <h2>A11Y Menu Settings</h2>
  <form action="options.php" method="POST">
    <?php
      settings_fields($this->slug);
      do_settings_sections($this->slug);
      submit_button();
    ?>
  </form>
</div>