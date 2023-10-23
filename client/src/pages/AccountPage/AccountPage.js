import React, { useState } from 'react';
import { Image, Button, TextInput, Group, Grid, Space, Checkbox, Spoiler } from '@mantine/core';
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import test from "../../assets/test.jpg";
import { IconPencil } from '@tabler/icons-react';
import classes from "./AccountPage.module.scss";

const AccountPage = () => {
  const { width } = useViewportSize();
  const form = useForm({
    initialValues: {
      name: "",
      email: '',
      password: "",
      phone: "",
    },

    validate: {
      name: (value) => value.length > 0 ? null : "Invalid name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value.length > 0 ? null : "Invalid name",
      phone: (value) => /^0\d{9}/.test(value) ? null : "Invalid phone"
    },
  });

  const [value, setValue] = useState(["personalInformation", "cookie"]);


  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "30px", paddingLeft: "5px" }}>Account Setting</div>

      <div style={useGetComponentStyle()}>
        <Grid >
          <Grid.Col xs={12} md="content" >
            <div className={classes.avatar}>
              <Image styles={{ imageWrapper: { borderRadius: "50%", overflow: "hidden" } }} width={150} height={150} fit="contain" src={test} alt="Avatar" />
              <Button styles={{ root: { padding: "4px 6px 4px" }, leftIcon: { marginRight: "2px" } }} className={classes.edit} compact variant="filled" leftIcon={<IconPencil />}>Edit</Button>
            </div>
          </Grid.Col>
          <Grid.Col xs={12} md={6} >
            <div className={classes.form} style={{ margin: width > 992 ? "0 20px" : "0 auto" }}>
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                  withAsterisk
                  label="Name"
                  placeholder="name"
                  {...form.getInputProps('name')}
                // styles={{ root: { height: "80px" } }}
                />
                <Space h="xs" />
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                // styles={{ root: { height: "80px" } }}
                />
                <Space h="xs" />
                <TextInput
                  withAsterisk
                  label="Password"
                  placeholder="password"
                  {...form.getInputProps('password')}
                // styles={{ root: { height: "80px" } }}
                />
                <Space h="xs" />
                <TextInput
                  withAsterisk
                  label="Phone"
                  placeholder="09XXXXXXXX"
                  {...form.getInputProps('phone')}
                // styles={{ root: { height: "80px" } }}
                />

                <Group position="right" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </div>
          </Grid.Col>
        </Grid>
      </div>

      <div style={{ marginTop: "10px", ...useGetComponentStyle() }}>
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" >
          <div style={{ padding: width > 992 ? "0 40px" : "0 10px" }}>
            <div style={{ fontWeight: "bold", fontSize: "25px" }}>Privacy Policy</div>
            <div>Welcome to our website. We value your privacy and are committed to protecting your personal information. Before using this website, please take a moment to read the following privacy policy. Your use of this website indicates your agreement to the terms and conditions outlined below.</div>
            <Space h="md" />
            <div>
              <Checkbox.Group value={value} onChange={setValue} withAsterisk>
                <Checkbox value="cookie" styles={{ label: { fontSize: "20px" }, input: { width: "20px" }, inner: { transform: "translateY(2px)" } }} label="Necessary Cookies" description="Necessary cookies enable core functionality. The website cannot function properly without these cookies, and they can only be disabled by changing your browser preferences." />
                <Space h="xs" />
                <Checkbox value="personalInformation" styles={{ label: { fontSize: "20px" }, input: { width: "20px" }, inner: { transform: "translateY(2px)" } }} label="Personal Information" description="We collect and use your information to improve our services, respond to your inquiries, and send you relevant communications." />
              </Checkbox.Group>
            </div>
            <Space h="md" />
            <ul className={classes["privacy-term"]}>
              <li>
                We reserve the right to update or modify this privacy policy at any time. Any changes will be posted on this page.
              </li>
              <li>
                Our website is not intended for use by minors, and minors should use this website under the supervision of a legal guardian.
              </li>
              <li>
                We employ reasonable security measures to protect your information; however, please understand that information transmitted over the internet cannot be guaranteed 100% secure.
              </li>
            </ul>
          </div >
        </Spoiler>
      </div>
    </>
  );
};

export default AccountPage;