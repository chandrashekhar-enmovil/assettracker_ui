import React, { useContext, useState, useEffect } from 'react';
import { Grid, Checkbox, Typography, Paper, FormGroup, FormControlLabel } from '@mui/material';
import AppContext from '../../AppContext/AppContext';
import {View,Text,StyleSheet} from 'react-native';

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
  const [expandedCategories, setExpandedCategories] = useState(formData.expandedCategories || {});
  const [selectedSkills, setSelectedSkills] = useState(formData.skillsByCategory || {});
  useEffect(() => {
    if (formData.expandedCategories) {
      setExpandedCategories(formData.expandedCategories);
    } else {
      const initialExpandedCategories = {};
      skillsData.forEach((category) => {
        initialExpandedCategories[category.name] = false;
      });
      setExpandedCategories(initialExpandedCategories);
    }
  }, [formData]);

  useEffect(() => {
    updateFormData('skillsByCategory', selectedSkills);
  }, [selectedSkills, updateFormData]);
  const handleSkillCheckboxChange = (categoryName, skill) => {
    const updatedSkills = {
      ...selectedSkills,
      [categoryName]: {
        ...selectedSkills[categoryName],
        [skill]: !selectedSkills[categoryName]?.[skill],
      },
    };
    setSelectedSkills(updatedSkills);
    updateFormData('skillsByCategory', updatedSkills);
  };

  const areAllSkillsSelected = (categoryName) => {
    const categorySkills = selectedSkills[categoryName] || {};
    return skillsData
      .find((category) => category.name === categoryName)
      .skills.every((skill) => categorySkills[skill]);
  };

  const handleSelectAllSkills = (categoryName) => {
    const allSkills = skillsData.find((category) => category.name === categoryName).skills;
    const allSelected = areAllSkillsSelected(categoryName);

    const updatedSkills = {
      ...selectedSkills,
      [categoryName]: allSkills.reduce((acc, skill) => {
        acc[skill] = !allSelected;
        return acc;
      }, {}),
    };
    setSelectedSkills(updatedSkills);
    updateFormData('skillsByCategory', updatedSkills);
  };
  return (
  <>
    <View style={styles.header}>
        <Text style={styles.title}>Select your  Skills</Text>
      </View>
    <Grid container spacing={4} padding={2}>
      {skillsData.map((data) => (
        <Grid container item key={data.id} spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Paper elevation={2} style={{ padding: '10px' }}>
              <Typography>{data.id+' . '+data.name}</Typography>
            </Paper>
          </Grid>

          {/* <Grid item xs={1} textAlign="center">
            <Checkbox
              checked={expandedCategories[data.name] || false}
              onChange={() => handleMainCheckboxChange(data.name)}
            />
          </Grid> */}
          <Grid item xs={7}>
          {/* expandedCategories[data.name] */}
            {true && (
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
                      label={'Select All'}
                    />
                    {data.skills.map((skill) => (
                      <FormControlLabel
                        key={skill}
                        control={
                          <Checkbox
                            checked={!!selectedSkills[data.name]?.[skill]}
                            onChange={() => handleSkillCheckboxChange(data.name, skill)}
                          />
                        }
                        label={skill}
                      />
                    ))}
                  </div>
                </FormGroup>
              </Paper>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default SkillsGrid;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
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
  },});