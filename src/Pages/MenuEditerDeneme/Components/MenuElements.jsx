import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react'
import { useCategories, useItems } from '../customHooks/useMenuElementsContext';
import CategoryAccordionSummary from './CategoryAccordionSummary';
const MenuElements = () => {
  const [expandedCategory, setExpandedCategory] = useState("")
  const categoryList = useCategories()
  const itemList = useItems()
  return (
    <>
      {categoryList.map((category, catIdx) => (
        <>
          <Accordion expanded={category.objectId == expandedCategory} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              sx={{
                borderRadius: "15px",
                minHeight: "unset",
                padding: "0 0",
                ".MuiAccordionSummary-content": { margin: "0 0" },
              }}
            >
              <CategoryAccordionSummary category={categoryList[catIdx]} setExpandedCategory={setExpandedCategory} />
            </AccordionSummary>
            <AccordionDetails>
              {console.log("rendredn", catIdx)}
              {itemList[catIdx].map((item, itemIdx) => (
                <a>{item.name}</a>
              ))}
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  )
}

export default MenuElements;