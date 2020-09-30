<?php

	include 'models/db-model.php';

	$dbModel = new DbModel();

	echo json_encode($dbModel->getQuizes());

?>