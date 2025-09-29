import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { ResumeState } from "@/store/slices/resumeSlice";
import { FONTS, fontStyles } from "./fonts";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    ...fontStyles.base,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    marginBottom: 10,
  },
  headerInfo: {
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    ...fontStyles.heading,
    color: "#1e40af",
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 3,
  },
  contactItem: {
    marginRight: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    ...fontStyles.heading,
    color: "#1e40af",
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#1e40af",
    borderBottomStyle: "solid",
    paddingBottom: 4,
  },
  summary: {
    ...fontStyles.body,
    color: "#374151",
    textAlign: "justify",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    ...fontStyles.subheading,
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
    ...fontStyles.subheading,
    color: "#111827",
  },
  company: {
    fontSize: 11,
    color: "#4b5563",
    fontStyle: "italic",
  },
  dateLocation: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "right",
  },
  description: {
    fontSize: 10,
    color: "#374151",
    marginTop: 3,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  institution: {
    fontSize: 11,
    color: "#4b5563",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillCategory: {
    marginBottom: 8,
    width: "100%",
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 3,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    padding: "3 8",
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  languageItem: {
    width: "48%",
    marginBottom: 5,
    marginRight: "2%",
  },
  languageName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },
  languageLevel: {
    fontSize: 10,
    color: "#6b7280",
  },
  certificateItem: {
    marginBottom: 6,
  },
  certificateName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },
  certificateDetails: {
    fontSize: 10,
    color: "#6b7280",
  },
});

interface ModernTemplateProps {
  data: ResumeState;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryLabels: Record<string, string> = {
    technical: "Technical Skills",
    soft: "Soft Skills",
    tools: "Tools & Software",
    other: "Other Skills",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>
                {personalInfo.firstName} {personalInfo.lastName}
              </Text>
              <View style={styles.contactRow}>
                <Text style={styles.contactItem}>{personalInfo.email}</Text>
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
                <Text style={styles.contactItem}>{personalInfo.location}</Text>
              </View>
              {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
                <View style={styles.contactRow}>
                  {personalInfo.linkedin && (
                    <Text style={styles.contactItem}>LinkedIn: {personalInfo.linkedin}</Text>
                  )}
                  {personalInfo.github && (
                    <Text style={styles.contactItem}>GitHub: {personalInfo.github}</Text>
                  )}
                  {personalInfo.website && (
                    <Text style={styles.contactItem}>{personalInfo.website}</Text>
                  )}
                </View>
              )}
            </View>
            {personalInfo.photo && (
              <Image style={styles.profileImage} src={personalInfo.photo} />
            )}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateLocation}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </Text>
                    {exp.location && (
                      <Text style={styles.dateLocation}>{exp.location}</Text>
                    )}
                  </View>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.degree}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateLocation}>
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </Text>
                    {edu.gpa && <Text style={styles.dateLocation}>GPA: {edu.gpa}</Text>}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <View key={category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    {categoryLabels[category] || category}
                  </Text>
                  <View style={styles.skillsList}>
                    {categorySkills.map((skill) => (
                      <Text key={skill.id} style={styles.skillItem}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.languageGrid}>
              {languages.map((lang) => (
                <View key={lang.id} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageLevel}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certificates.map((cert) => (
              <View key={cert.id} style={styles.certificateItem}>
                <Text style={styles.certificateName}>{cert.name}</Text>
                <Text style={styles.certificateDetails}>
                  {cert.issuer} • {cert.date}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
