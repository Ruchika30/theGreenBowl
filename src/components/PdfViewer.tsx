import React, { useState } from "react"
import { Document, Page } from "react-pdf"

function PdfViewer() {
	const [numPages, setNumPages] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages)
	}
	return (
		<div>
			{pageNumber === 1 && (
				<Document file="./Menu.pdf" onLoadSuccess={onDocumentLoadSuccess}>
					<Page pageNumber={1} />
				</Document>
			)}
		</div>
	)
}
export default PdfViewer
