import { Box, useTheme, Grid, TextField, Typography} from '@mui/material';
import React, { useState } from 'react'
import { IconTooltipButton } from '../../../Components/IconTooltipButton';
import { ResponsiveIconButton_GridItems } from './ResponsiveIconButtonGridItems';
import { CATEGORY_ACTIONS } from '../customHooks/useMenuReducer';
import { useCategoriesDispatch } from '../customHooks/useMenuElementsContext';

const CategoryAccordionSummary = ({ category, setExpandedCategory, expandedCategory}) => {
  console.log(category.objectId)
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [clickedEditButton, setClickedEditButton] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const categoryDispatch = useCategoriesDispatch()
  const theme = useTheme()
  const editCategory = async (category) => {
    console.log(category);
    if (categoryName != "") {
      category.set("name", categoryName);
      setCategoryName('');
      await category.save();
      categoryDispatch({type : CATEGORY_ACTIONS.UPDATE, params : {category : category}});
    }
    setClickedEditButton(false)
  }




  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "15px",
          backgroundImage: category.image
            ? isImageChanged
              ? "url(" + category.image?._url + ")"
              : "url(" + category.image?.url + ")"
            : "url('https://www.colorhexa.com/2a4365.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          container
          wrap="nowrap"
          sx={{
            borderRadius: "15px",
            backdropFilter: "blur(3px)",
            padding: 2,
          }}
        >
          <Grid item xs="auto">
            {expandedCategory == category.objectId ? (
              <IconTooltipButton
                title="Kapat"
                color="secondary"
                onClick={setExpandedCategory("")}
                icon={<i class="fa-solid fa-circle-minus"></i>}
              />
            ) : (
              <IconTooltipButton
                title="Aç"
                color="secondary"
                onClick={setExpandedCategory(category.objectId)}
                icon={<i class="fa-solid fa-circle-plus"></i>}
              />
            )}
          </Grid>
          <Grid item xs zeroMinWidth>
            {clickedEditButton ? (
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255, 0.8);",
                  borderRadius: "15px",
                  width: "fit-content",
                  p: 1,
                }}
              >
                <TextField
                  defaultValue={category.name}
                  label="Kategori İsmi"
                  variant="standard"
                  onKeyPress={(event) => (event.charCode == 13) && editCategory(category) }
                  onChange={(event) => setCategoryName(event.target.value)}
                  size="small"
                />
              </Box>
            ) : (
              <Typography
                variant="h5"
                sx={{ color: theme.palette.secondary.main }}
              >
                {category.name}
              </Typography>
            )}
          </Grid>
          <ResponsiveIconButton_GridItems/>
        </Grid>
      </Box>
    </>
  )
}

export default CategoryAccordionSummary