export const trancuateText = (text, size) => {
	let descWithHTMLTags = text.slice(0, size);

	// REMOVING LAST CHARACTER AGAIN CAUSE IT MIGHT CONTAIN SOME HTML TAGS
	descWithHTMLTags = descWithHTMLTags.substring(0, descWithHTMLTags.length - 1);

	descWithHTMLTags = `${descWithHTMLTags}...`;
	return text?.length > size ? descWithHTMLTags : text;
};
