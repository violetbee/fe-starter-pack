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
    ...fontStyles.base,
    fontSize: 11,
    lineHeight: 1.4,
  },
  sidebar: {
    position: "absolute",
  },
  main: {
    marginLeft: "35%",
    padding: "30 30 30 20",
  },
  profileSection: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 10,
    textAlign: "center",
  },
  contactSection: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactItem: {
    fontSize: 9,
    color: "#6c757d",
    marginBottom: 5,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  mainSection: {
    marginBottom: 20,
  },
  mainSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212529",
    borderBottomWidth: 2,
    borderBottomColor: "#dee2e6",
    paddingBottom: 5,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summary: {
    fontSize: 11,
    color: "#495057",
    textAlign: "justify",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#212529",
  },
  experienceCompany: {
    fontSize: 11,
    color: "#6c757d",
    fontStyle: "italic",
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 9,
    color: "#6c757d",
    marginBottom: 3,
  },
  experienceDescription: {
    fontSize: 10,
    color: "#495057",
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 10,
  },
  skillTag: {
    fontSize: 9,
    backgroundColor: "#e9ecef",
    color: "#495057",
    padding: "3 6",
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  languageItem: {
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    color: "#495057",
  },
  languageLevel: {
    fontSize: 9,
    color: "#6c757d",
    fontStyle: "italic",
  },
});

interface ProfessionalTemplateProps {
  data: ResumeState;
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile */}
          <View style={styles.profileSection}>
            {personalInfo.photo && (
              <Image style={styles.profileImage} src={personalInfo.photo} />
            )}
            <Text style={styles.name}>
              {personalInfo.firstName} {personalInfo.lastName}
            </Text>
          </View>

          {/* Contact */}
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Contact</Text>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            {personalInfo.website && (
              <Text style={styles.contactItem}>{personalInfo.website}</Text>
            )}
            {personalInfo.linkedin && (
              <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>
            )}
            {personalInfo.github && (
              <Text style={styles.contactItem}>{personalInfo.github}</Text>
            )}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillTag}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactTitle}>Languages</Text>
              {languages.map((lang) => (
                <View key={lang.id} style={styles.languageItem}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageLevel}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactTitle}>Certifications</Text>
              {certificates.map((cert) => (
                <View key={cert.id} style={styles.languageItem}>
                  <Text style={styles.languageName}>{cert.name}</Text>
                  <Text style={styles.languageLevel}>
                    {cert.issuer} • {cert.date}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Summary */}
          {summary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Work Experience</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <Text style={styles.experienceTitle}>{exp.position}</Text>
                  <Text style={styles.experienceCompany}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </Text>
                  <Text style={styles.experienceDate}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.experienceTitle}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </Text>
                  <Text style={styles.experienceCompany}>
                    {edu.institution} {edu.location && `• ${edu.location}`}
                  </Text>
                  <Text style={styles.experienceDate}>
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
