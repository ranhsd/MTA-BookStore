"use strict";

// get the entry that was sent by the client 
function getEntry(afterTableName, connection) {
	var query = connection.prepareStatement("select * from \"" + afterTableName + "\"");
	var queryResult = query.executeQuery();
	query.close();
	var record = null;
	while (queryResult.next()) {
		record = queryResult;
	}

	return record;
}

function findAuthorByName(authorName, connection) {
	// TODO: change LIKE to equal 
	var query = connection.prepareStatement("SELECT * FROM \"bookstore.db::store.Author\" WHERE \"authorName\" LIKE" + "'%" + authorName +
		"%'");
	var queryResult = query.executeQuery();
	query.close();
	while (queryResult.next()) {
		return queryResult;
	}

	return null;
}

function findAuthorById(authorId, connection) {
	// TODO: change LIKE to equal 
	var query = connection.prepareStatement("SELECT * FROM \"bookstore.db::store.Author\" WHERE \"authorId\" =" + authorId);
	var queryResult = query.executeQuery();
	query.close();
	while (queryResult.next()) {
		return queryResult;
	}

	return null;
}

/**
 * This function will execute a query for adding a new author to the database
 * 
 * */
function insertNewAuthor(authorName, connection) {
	var currentAuthorIdQuery = connection.prepareStatement("SELECT \"bookstore.db::authorseq\".NEXTVAL FROM DUMMY");
	var currentAuthorIdQueryResult = currentAuthorIdQuery.executeQuery();

	var nextAuthorId = 0;

	while (currentAuthorIdQueryResult.next()) {
		nextAuthorId = currentAuthorIdQueryResult.getInt(1);
		break;
	}

	var query = connection.prepareStatement("insert into \"bookstore.db::store.Author\" values(?,?,?,?)");
	query.setInt(1, nextAuthorId);
	query.setString(2, authorName);
	query.setInt(3, 0);
	query.setInt(4, 0);
	query.executeUpdate();
	query.close();

	return nextAuthorId;
}

/**
 * This function will execute a query for adding a new book to the database
 * bookId property will be generated via the database sequence
 * after adding a new book we need to update the author number of books column 
 * */
function insertNewBook(bookName, authorId,isbn,price, connection) {

	var currentBookIdQuery = connection.prepareStatement("SELECT \"bookstore.db::bookseq\".NEXTVAL FROM DUMMY");
	var currentBookIdQueryResult = currentBookIdQuery.executeQuery();

	var nextBookId = 0;

	while (currentBookIdQueryResult.next()) {
		nextBookId = currentBookIdQueryResult.getInt(1);
		break;
	}

	var query = connection.prepareStatement("INSERT INTO \"bookstore.db::store.Book\" VALUES(?,?,?,?,?,?,?)");

	query.setInt(1, nextBookId);
	query.setInt(2, authorId);
	query.setString(3, isbn);
	query.setString(4, bookName);
	query.setInt(5, price);
	query.setString(6,"USD");
	query.setString(7,"");
	query.executeUpdate();
	query.close();

	incrementNumberOfBooksForAuthorWithId(authorId, connection);
}

function incrementNumberOfBooksForAuthorWithId(authorId, connection) {
	// 1. Get the author by id from the database

	var authorRecord = findAuthorById(authorId, connection);
	if (authorRecord) {
		var numberOfBooks = authorRecord.getInt(3);
		numberOfBooks = numberOfBooks + 1;
		var query = connection.prepareStatement("UPDATE \"bookstore.db::store.Author\" SET \"numberOfBooks\" = ? WHERE \"authorId\" = ?");
		query.setInt(1, numberOfBooks);
		query.setInt(2, authorId);
		query.executeUpdate();
		query.close();
	}
}

function createBook(param) {
	
	
	var entityToCreate = getEntry(param.afterTableName, param.connection);
	if (!entityToCreate) {
		throw "Invalid entry";
	}
	// TODO: Change to more generic solution 
	var isbn = entityToCreate.getString(3);
	var bookName = entityToCreate.getString(4);
	var price = entityToCreate.getString(5);
	var authorName = entityToCreate.getString(7);

	if (!authorName || !bookName || !isbn || !price) {
		throw "Bad Request";
	}

	var authorId = -1;

	var authorRecord = findAuthorByName(authorName, param.connection);
	if (!authorRecord) {
		authorId = insertNewAuthor(authorName, param.connection);
	} else {
		authorId = authorRecord.getInt(1);
	}

	insertNewBook(bookName, authorId, isbn,price, param.connection);
}