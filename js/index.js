document.addEventListener("DOMContentLoaded", function () {
	const listContainer = document.querySelector("ul#list");
	const showPanel = document.querySelector("#show-panel");

	fetch("http://localhost:3000/books")
		.then((response) => response.json())
		.then((booksObject) => {
			booksObject.forEach((book) => {
				const li = document.createElement("li");
				li.textContent = book.title;
				li.addEventListener("click", function () {
					renderBookDisplay(book);
				});
				listContainer.appendChild(li);
			});
		});

	function renderBookList(bookObjects) {
		bookObjects.forEach((book) => {
			const li = document.createElement("li");
			li.textContent = book.title;
			li.addEventListener("click", () => {
				renderBookDisplay(book);
			});
		});
	}

	function renderBookDisplay(book) {
		const thumbnail = document.createElement("img");
		thumbnail.setAttribute("src", book.img_url);
		const description = document.createElement("p");
		const userLikesContainer = document.createElement("ul");

		userLikesContainer.setAttribute("id", "user-likes-container");
		description.textContent = book.description;
		showPanel.appendChild(thumbnail);
		showPanel.appendChild(description);
		showPanel.appendChild(userLikesContainer);
		renderLikeButton(book, userLikesContainer);
		addLikesList(book, userLikesContainer);
	}

	function renderLikeButton(book, userLikesContainer) {
		const btn = document.createElement("button");
		btn.textContent = `Like ${book.title}`;
		btn.addEventListener("click", function () {
			const configuartionObject = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					users: [
						{ id: 2, username: "auer" },
						{ id: 8, username: "maverick" },
						{ id: 11, username: "hillswor" },
					],
				}),
			};
			fetch(`http://localhost:3000/books/${book.id}`, configuartionObject)
				.then((response) => response.json())
				.then((book) => {
					const li = document.createElement("li");
					const recentLike = book.users.slice(-1);
					li.textContent = recentLike[0].username;
					userLikesContainer.appendChild(li);
				});
		});
		showPanel.appendChild(btn);
	}

	function addLikesList(book, userLikesContainer) {
		book.users.forEach((user) => {
			const userLikeListElement = document.createElement("li");
			userLikeListElement.textContent = user.username;
			userLikesContainer.appendChild(userLikeListElement);
			showPanel.appendChild(userLikesContainer);
		});
	}
});
