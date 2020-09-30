<?php

	include 'models/db-model.php';

	$dbModel = new DbModel();
	$quiz = filter_var($_GET['quiz'], FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE);
	if(!$quiz){
		$quiz = 1;
	}
	echo json_encode($dbModel->getQuiz($quiz));

?>