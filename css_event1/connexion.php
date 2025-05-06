<?php
    $servername="localhost";
    $username="root";
    $password="";
    $dbname="projet";

    $conn=new mysqli($servername,$username,$password,$dbname);// Crée une nouvelle connexion MySQL

    if($conn->connect_error){// Vérifie si la connexion a échoué
        die("Connection failed:" .$conn->connect_error);
    }

    if($_SERVER["REQUEST_METHOD"]== "POST"){
        $firstName=$_POST['firstName'];
        $lastName=$_POST['lastName'];
        $email=$_POST['email'];
        $message=$_POST['message'];


        // Crée la requête SQL d'insertion 
        $sql="INSERT INTO Enregistrements(firstName,lastName,email,message) VALUES('$firstName','$lastName','$email','$message')";

        if($conn->query($sql)===TRUE){
            echo"New record created successfully";

        }else{
            echo "Error:" . $conn->error;

        }
    
    }

    $sql ="SELECT * FROM Enregistrements"; // Requête pour sélectionner tous les enregistrements
    $result =$conn->query($sql);

    if($result->num_rows>0){
        // Crée l'en-tête du tableau HTML
        echo "<table><tr>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>Message</th>
                </tr>";
        while($row = $result->fetch_assoc()){// fetch_assoc() retourne une ligne sous forme de tableau associatif
            echo "<tr>
                    <td>".$row["firstName"]."</td>
                <td>".$row["lastName"]."</td>
                <td>".$row["email"]."</td>
                <td>".$row["message"]."</td>
                </tr>";
        }//Garantit que le texte s'affiche tel quel, même s'il contient des caractères HTML
        echo"</table>";
    }  else{
        echo "0 results";// Message si pas de résultats

    }
    $conn->close();
    ?>
