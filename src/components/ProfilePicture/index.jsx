import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import { Box, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { useState } from 'react'

function ProfilePicture() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    if (open === false) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const form = useForm({
    defaultValues: {
      avatar: '',
    },
  })

  const { register, handleSubmit } = form

  const onsubmit = (data) => {
    console.log(data)
  }
  return (
    <Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={'2rem'}
      >
        <Box
          display={open ? 'flex' : 'none'}
          sx={{
            width: '150px',
            height: '150px',
            border: '3px solid',
            borderColor: 'primary.main',
            borderRadius: '100%',
            backgroundImage: 'url(/product.png)',
          }}
        ></Box>

        <PermIdentityOutlinedIcon
          sx={{
            width: '150px',
            height: '150px',
            border: '3px solid',
            borderColor: 'primary.main',
            borderRadius: '100%',
            display: open ? 'none' : 'flex',
          }}
        />
        <SettingsIcon sx={{ marginLeft: '6rem' }} onClick={handleClickOpen} />
        <Box
          display={open ? 'flex' : 'none'}
          component="form"
          onSubmit={handleSubmit(onsubmit)}
          flexDirection={'column'}
          maxWidth={'200px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <TextField
            label="change avatar"
            type="url"
            {...register('avatar')}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            sx={{ maxWidth: '90%', mt: '1rem' }}
          >
            change
          </Button>
        </Box>

        <Typography variant="h1">name</Typography>
      </Box>
    </Box>
  )
}

export default ProfilePicture
