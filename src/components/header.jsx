import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: '#4527a0' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gerenciamento de Projetos
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}