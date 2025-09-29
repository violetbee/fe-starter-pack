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
    padding: 35,
    ...fontStyles.base,
    fontFamily: FONTS.secondary, // Use Open Sans for classic look
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Times-Bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 5,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
  },
  itemSubtitle: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 10,
    fontStyle: "italic",
  },
  itemDescription: {
    fontSize: 10,
    marginTop: 3,
    textAlign: "justify",
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  skillItem: {
    fontSize: 10,
    marginRight: 15,
    marginBottom: 3,
  },
  subsection: {
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    marginBottom: 3,
  },
});

interface ClassicTemplateProps {
  data: ResumeState;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          <Text style={styles.contactInfo}>
            {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
          </Text>
          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <Text style={styles.contactInfo}>
              {[personalInfo.linkedin, personalInfo.github, personalInfo.website]
                .filter(Boolean)
                .join(" | ")}
            </Text>
          )}
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {exp.company} {exp.location && `• ${exp.location}`}
                </Text>
                <Text style={styles.itemDescription}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {edu.degree} in {edu.fieldOfStudy}
                  </Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {edu.institution} {edu.location && `• ${edu.location}`}
                </Text>
                {edu.gpa && <Text style={styles.itemDescription}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages & Certificates */}
        {(languages.length > 0 || certificates.length > 0) && (
          <View style={styles.section}>
            {languages.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Languages</Text>
                <View style={styles.skillsRow}>
                  {languages.map((lang) => (
                    <Text key={lang.id} style={styles.skillItem}>
                      • {lang.name} ({lang.proficiency})
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {certificates.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>Certifications</Text>
                {certificates.map((cert) => (
                  <Text key={cert.id} style={styles.skillItem}>
                    • {cert.name} - {cert.issuer} ({cert.date})
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}
