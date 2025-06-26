
'use client';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Box, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from "next/link";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { signUpUser } from "@/redux/signup-slice";
// import { AppDispatch } from "@/redux/store";
// import { signUpUser } from "@/redux/signupSlice";


const schema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
  role: yup.string().required("Gender is required"),
  organizationName: yup.string().required("please select organization ")

});

interface formData {
  name: string;
  email: string;
  password: string;
  role: string;
  organizationName: string

}

const Signup: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const[orgName,setOrgName]=useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: formData) => {
    // dispatch(signUpUser(data))
    //   .unwrap()
    //   .then(() => {

    //     setTimeout(() => {
    //       router.push('/login');
    //     }, 1000);
    //   })
    //   .catch((err) => {

    //     console.error(err);
    //   });
    console.log(data)
  };
    const handleChange = (event: SelectChangeEvent) => {
    setOrgName(event.target.value as string);
  };

  return (
    <>


      <Box display={"flex"} paddingTop={"6%"} width={'100vw'}>
        <Box
          sx={{
            minWidth: 300,
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            width: "50%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>
          <h6>Already have an account? <Link href={'/login'}>Login</Link></h6>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControl margin="normal">
              <FormLabel>Gender</FormLabel>
              <RadioGroup row>
                <FormControlLabel value="admin" control={<Radio {...register("role")} />} label="Male" />
                <FormControlLabel value="team-lead" control={<Radio {...register("role")} />} label="Female" />
                <FormControlLabel value="user" control={<Radio {...register("role")} />} label="Other" />
              </RadioGroup>
              {errors.role && <p style={{ color: 'red' }}>{errors.role.message}</p>}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Organization</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orgName}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Signup
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Signup;