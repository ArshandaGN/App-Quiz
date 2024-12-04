<?php
// Inisialisasi variabel
$error = '';
$isError = false;
$name = '';
$nim = '';

// Validasi data form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['name']) && $_POST['name'] !== '') {
        $name = htmlspecialchars($_POST['name']); // Gunakan htmlspecialchars untuk keamanan
        if (isset($_POST['nim']) && $_POST['nim'] !== '') {
            $nim = htmlspecialchars($_POST['nim']); // Gunakan htmlspecialchars untuk keamanan
        } else {
            $error = 'NIM belum diisi';
            $isError = true;
        }
    } else {
        $error = 'Nama belum diisi';
        $isError = true;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
  <?php if ($isError): ?>
    <p style="color: red;"><?= $error ?></p> 
  <?php endif; ?>
  <?php if ($name): ?>
    <h1>Nama: <?= $name ?></h1>
  <?php endif; ?>
  <?php if ($nim): ?>
    <h1>NIM: <?= $nim ?></h1>
  <?php endif; ?>
  
  <form action="" method="post">
    <div>
      <label for="name">Nama: </label>
      <input id="name" name="name" type="text" placeholder="Masukkan Nama">
    </div>
    <div>
      <label for="nim">NIM: </label>
      <input id="nim" name="nim" type="text" placeholder="Masukkan NIM">
    </div>
    <button type="submit">Submit</button>
  </form>

  <script src="script.js"></script>
</body>
</html>
