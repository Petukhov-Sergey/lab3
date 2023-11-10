function showDescription(element) {
	var description = element.querySelector('.option');
	if (description.style.display === "block") {
		description.style.display = "none";
	} else {
		description.style.display = "block";
	}
}