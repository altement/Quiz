<?php



class DbModel
{
	protected $db;
	public function __construct()
	{
		$config = include 'config.php';
		$this->db = new PDO('mysql:host='.$config->host.';dbname='.$config->db.';charset=utf8mb4', $config->user, $config->pass);
	}

	public function getQuizes(){

		$sth = $this->db->prepare('SELECT quizes.*
			FROM `quizes`
			INNER JOIN `questions`
			ON `quiz_id` = `quizes`.`id`
			GROUP BY `quizes`.`id`
			HAVING COUNT(*) > 3
			ORDER BY RAND();');

		$sth->execute();

		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getQuiz($quiz = 1){
		
		$sth = $this->db->prepare('SELECT *
			FROM `questions`
			WHERE `quiz_id` = ?');

		$sth->bindValue(1, $quiz);
		$sth->execute();

		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}
	# PHP variant, vue poolel lahendatud
	/*public function getRandomQuiz(){
		$sth = $this->db->prepare('SELECT quizes.*
			FROM `quizes`
			INNER JOIN `questions`
			ON `quiz_id` = `quizes`.`id`
			GROUP BY `quizes`.`id`
			HAVING COUNT(*) > 3
			ORDER BY RAND()
			LIMIT 1;');

		$sth->execute();
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}*/
}

?>