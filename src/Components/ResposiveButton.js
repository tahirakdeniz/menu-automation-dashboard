import { Button, IconButton, Tooltip, useMediaQuery } from '@mui/material'
import React from 'react'

const ResponsiveButton = React.forwardRef((props, ref) => {
  const { title, children, breakpoint = 'sm', ...leftProps } = props;
  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down(breakpoint));
  return (
    <Tooltip title={title ? title : children}>
      {isScreenSmall ?
        <Button {...leftProps} ref={ref} sx={{
          '.MuiButton-startIcon': {
            m: 0
          },
          '.MuiButton-endIcon': {
            m: 0
          },
          minWidth: 'unset'
        }} />
        :
        <Button {...leftProps} ref={ref}>{children ? children : title}</Button>}
    </Tooltip>
  )
})

export default ResponsiveButton