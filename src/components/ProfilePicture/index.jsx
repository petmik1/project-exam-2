import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import { Box, Typography, Alert, CircularProgress, AlertTitle } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { useState } from 'react'
import storage from '../../storage'
import api from '../../data/apiBase'

function ProfilePicture() {
  const [open, setOpen] = useState(false)
  const user = storage.load('user')
  const avatar = storage.load('avatar')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  const onsubmit = async (data) => {
    try {
      setLoading(true)
      const response = await api.put(
        'profiles/' + user.name + '/media',
        data,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      storage.save('avatar', response.data.avatar)      
    } catch (error) {
      setErrorMessage(error.toJSON().message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box>
      <Box maxWidth={'800px'} margin={'1rem auto'}>
        <Alert
          severity="error"
          sx={{ display: errorMessage ? 'flex' : 'none' }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>Profile picture update error</AlertTitle>
          {errorMessage}
        </Alert>
        <CircularProgress
          sx={{ margin: '0 auto', display: loading ? 'block' : 'none' }}
        />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={'2rem'}
      >
        <Box
          display={avatar ? 'flex' : 'none'}
          component={'img'}
          src={avatar}
          sx={{
            width: '150px',
            height: '150px',
            border: '3px solid',
            borderColor: 'primary.main',
            borderRadius: '100%',
          }}
        ></Box>
        <PermIdentityOutlinedIcon
          sx={{
            width: '150px',
            height: '150px',
            border: '3px solid',
            borderColor: 'primary.main',
            borderRadius: '100%',
            display: avatar ? 'none' : 'flex',
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

        <Typography variant="h1">{user.name}</Typography>
      </Box>
    </Box>
  )
}

export default ProfilePicture
