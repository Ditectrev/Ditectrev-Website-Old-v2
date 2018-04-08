<?php

$errorMSG = "";


// Check if name field has been filled.
if (empty($_POST["name"])) {
	$errorMSG = "Name is required.";
} else {
	$name = $_POST["name"];
}
// Check if email field has been filled.
if (empty($_POST["email"])) {
	$errorMSG = "Email is required.";
} else {
	$email = $_POST["email"];
}
// Check if name field has been filled.
if (empty($_POST["subject"])) {
	$errorMSG = "Subject is required.";
} else {
	$subject = $_POST["subject"];
}
// Check if message field has been filled.
if (empty($_POST["message"])) {
	$errorMSG = "Message is required.";
} else {
	$message = $_POST["message"];
}

$EmailTo = "contact@ditectrev.com";
$Subject = "Ditectrev contact form copy";

// Prepare email body text.
$Body .= "Thank you for contacting us, we will answer within 24 hours.\nBelow is a copy of your message.\n\n" . "Name: " . $name . "\nEmail: " . $email . "\nSubject: " . $subject . "\nMessage: " . $message . "\n\nKind regards,\nDitectrev\n\nhttp://ditectrev.com";

// Allow using HTML in sending mail.
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: $from_email\n";
$headers .= "Reply-To: $from_email";

$success = mail($EmailTo, $Subject, $Body, $headers); // Send email.
$sender = mail($email, $Subject, $Body, $headers);

// Redirect to success page.
if ($success && $sender && $errorMSG === "") {
	echo "success";
} else {
	if ($errorMSG === "") {
		echo "Something went wrong.";
	} else {
		echo $errorMSG;
	}
}
