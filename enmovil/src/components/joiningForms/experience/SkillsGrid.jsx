import React, { useContext, useState, useEffect } from 'react';
import { Grid, Checkbox, Typography, Paper, FormGroup, FormControlLabel } from '@mui/material';
import AppContext from '../../AppContext/AppContext';
import { View, Text, StyleSheet } from 'react-native';

const skillsData = [
  { id: 1, name: 'Backend', skills: ['Node.js', 'Flask', 'Django', 'Spring', 'Laravel'] },
  { id: 2, name: 'Frontend', skills: ['React', 'Angular', 'Vue.js', 'Svelte'] },
  { id: 3, name: 'Mobile Development', skills: ['Swift', 'Kotlin', 'Flutter', 'React Native'] },
  { id: 4, name: 'Quality Assurance', skills: ['Selenium', 'JUnit', 'TestNG', 'Appium'] },
  { id: 5, name: 'Project Management', skills: ['Agile', 'Scrum', 'Jira', 'Trello'] },
  { id: 6, name: 'UI/UX', skills: ['Adobe XD', 'Figma', 'Sketch', 'InVision'] },
  { id: 7, name: 'Business Analyst', skills: ['Data Analysis', 'UML', 'BPMN', 'SQL'] },
  { id: 8, name: 'Operations & Customer Support', skills: ['CRM', 'Help Desk', 'ITIL', 'Customer Service'] },
  { id: 9, name: 'Finance & Accounts & Taxation', skills: ['QuickBooks', 'Excel', 'SAP', 'Tax Planning'] },
  { id: 10, name: 'Sales', skills: ['Lead Generation', 'Sales Strategy', 'CRM', 'Negotiation'] },
];

const SkillsGrid = () => {
  const { formData, updateFormData } = useContext(AppContext);
  const [selectedSkills, setSelectedSkills] = useState(() => {
    const initialSelectedSkills = {};
    skillsData.forEach((category) => {
      initialSelectedSkills[category.name] = formData.skillsByCategory?.[category.name] || [];
    });
    return initialSelectedSkills;
  });

  useEffect(() => {
    updateFormData('skillsByCategory', selectedSkills);
  }, [selectedSkills, updateFormData]);

  const handleSkillCheckboxChange = (categoryName, skill) => {
    setSelectedSkills((prevSelectedSkills) => {
      const categorySkills = prevSelectedSkills[categoryName] || [];
      const isSkillSelected = categorySkills.includes(skill);
      const updatedSkills = isSkillSelected
        ? categorySkills.filter((s) => s !== skill)
        : [...categorySkills, skill];
      return {
        ...prevSelectedSkills,
        [categoryName]: updatedSkills,
      };
    });
  };
  const areAllSkillsSelected = (categoryName) => {
    const categorySkills = selectedSkills[categoryName] || [];
    return skillsData
      .find((category) => category.name === categoryName)
      .skills.every((skill) => categorySkills.includes(skill));
  };

  const handleSelectAllSkills = (categoryName) => {
    setSelectedSkills((prevSelectedSkills) => {
      const allSkills = skillsData.find((category) => category.name === categoryName).skills;
      const allSelected = areAllSkillsSelected(categoryName);
      return {
        ...prevSelectedSkills,
        [categoryName]: allSelected ? [] : [...allSkills],
      };
    });
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Select your Skills</Text>
      </View>
      <Grid container spacing={4} padding={2}>
        {skillsData.map((data) => (
          <Grid container item key={data.id} spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Paper elevation={2} style={{ padding: '10px' }}>
                <Typography>{`${data.id} . ${data.name}`}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <Paper elevation={5} style={{ padding: '10px', paddingTop: '5px', paddingBottom: '0px' }}>
                <FormGroup>
                  <div className="horizontal-menu">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={areAllSkillsSelected(data.name)}
                          onChange={() => handleSelectAllSkills(data.name)}
                        />
                      }
                      label="Select All"
                    />
                    {data.skills.map((skill) => (
                      <FormControlLabel
                        key={skill}
                        control={
                          <Checkbox
                            checked={selectedSkills[data.name]?.includes(skill) || false}
                            onChange={() => handleSkillCheckboxChange(data.name, skill)}
                          />
                        }
                        label={skill}
                      />
                    ))}
                  </div>
                </FormGroup>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SkillsGrid;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
});
