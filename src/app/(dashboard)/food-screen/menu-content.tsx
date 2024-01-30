import * as React from "react"
import {
	Accordion,
	AccordionDetails,
	AccordionActions,
	AccordionSummary
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"

export default function MenuContent() {
	return (
		<div>
			<Accordion defaultExpanded elevation={0}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					Salads
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</AccordionDetails>
			</Accordion>
			<Accordion elevation={0}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2-content"
					id="panel2-header"
				>
					Smoothies
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</AccordionDetails>
			</Accordion>
			<Accordion elevation={0}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3-content"
					id="panel3-header"
				>
					Accordion Actions
				</AccordionSummary>
				<AccordionDetails>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</AccordionDetails>
				<AccordionActions>
					<Button>Cancel</Button>
					<Button>Agree</Button>
				</AccordionActions>
			</Accordion>
		</div>
	)
}
