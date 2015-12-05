<?php
  error_reporting(-1);
  ini_set('display_errors', 'On');
  require 'inc/Mandrill.php';

  // get your own!
  $mandrill = new Mandrill("JRZkxcALpDHaRlSZVUjhFA");

  $matches = $_POST['matches'];

  foreach ($matches as $match) {

    $html = "<p>Hey ". $match['giver'] ." you have " . $match['receiver'] . "! Nice!</p>";

    $message = array(
        'subject' => 'Test message',
        'from_email' => 'hello@hannahallen.ca',
        'html' => $html,
        'to' => array(array('email' => $match['giver'])),
    );

    $mandrill->messages->send($message);
  }
  // load in the libary

  // If are not using environment variables to specific your API key, use:

  
