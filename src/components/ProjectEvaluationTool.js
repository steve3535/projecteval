'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
// Add this style object
const styles = {
    criteriaColumn: {
      width: '300px',
      maxWidth: '300px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    weightColumn: {
      width: '80px',
    },
    projectColumn: {
      width: '150px',
    },
  };
  
const criteria = [
    { id: 1, name: "Is there a problem", weight: 4 },
    { id: 2, name: "Is the problem unworkable", weight: 5 },
    { id: 3, name: "Is the problem urgent", weight: 5 },
    { id: 4, name: "Is the problem recognized", weight: 4 },
    { id: 5, name: "Is the problem frequent", weight: 4 },
    { id: 6, name: "Can the business scale", weight: 4 },
    { id: 7, name: "Are we targeting an undeserved market", weight: 4 },
    { id: 8, name: "Do we have direct access to the end users", weight: 2 },
    { id: 9, name: "Are we passionate about the problem", weight: 3 },
    { id: 10, name: "Can this passionate us for the next 5 years", weight: 2 },
    // ... add the rest of your criteria here
  ];
const StarRating = ({ rating, onRating }) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "text-yellow-500" : "text-gray-300"}
            onClick={() => onRating(index)}
          >
            <span className="text-xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

const ProjectEvaluationTool = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  const handleScoreChange = (projectId, criterionId, value) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, scores: { ...project.scores, [criterionId]: value } }
          : project
      )
    );
  };

  const addProject = () => {
    if (newProjectName.trim()) {
      setProjects(prev => [...prev, { id: Date.now(), name: newProjectName, scores: {} }]);
      setNewProjectName("");
    }
  };

  const removeProject = (projectId) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
  };

  const calculateScore = (project) => {
    return criteria.reduce((total, criterion) => {
      const score = project.scores[criterion.id] || 0;
      return total + (score * criterion.weight);
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Evaluation Tool</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name"
          className="mr-2"
        />
        <Button onClick={addProject}>Add Project</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
             <TableHead style={styles.criteriaColumn}>Criteria</TableHead>
             <TableHead style={styles.weightColumn}>Weight</TableHead>
             {projects.map(project => (
             <TableHead key={project.id} style={styles.projectColumn}>
             {project.name}
             <button onClick={() => removeProject(project.id)} className="ml-2 text-red-500">X</button>
             </TableHead>
             ))}
          </TableRow>
        </TableHeader>
          <TableBody>
          {criteria.map(criterion => (
          <TableRow key={criterion.id}>
             <TableCell style={styles.criteriaColumn}>{criterion.name}</TableCell>
             <TableCell style={styles.weightColumn}>{criterion.weight}</TableCell>
             {projects.map(project => (
             <TableCell key={project.id} style={styles.projectColumn}>
               <StarRating
               rating={project.scores[criterion.id] || 0}
               onRating={(rating) => handleScoreChange(project.id, criterion.id, rating)}
               />
             </TableCell>
             ))}
          </TableRow>
          ))}
          <TableRow>
            <TableCell style={styles.criteriaColumn} className="font-bold">Total Score</TableCell>
            <TableCell style={styles.weightColumn}></TableCell>
            {projects.map(project => (
            <TableCell key={project.id} style={styles.projectColumn} className="font-bold">
            {calculateScore(project)}
            </TableCell>
          ))}
          </TableRow>
          </TableBody>    

      </Table>
    </div>
  );
};

export default ProjectEvaluationTool;