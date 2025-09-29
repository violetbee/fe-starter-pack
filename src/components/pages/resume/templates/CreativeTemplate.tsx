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
      padding: 0,
      ...fontStyles.base,
    },
    header: {
      backgroundColor: "#6366f1",
      padding: 30,
      color: "#ffffff",
    },
    headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#ffffff",
    marginLeft: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 10,
    opacity: 0.9,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  body: {
    padding: 30,
  },
  twoColumn: {
    flexDirection: "row",
  },
  leftColumn: {
    width: "65%",
    paddingRight: 20,
  },
  rightColumn: {
    width: "35%",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6366f1",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitleText: {
    marginLeft: 8,
  },
  sectionIcon: {
    width: 20,
    height: 2,
    backgroundColor: "#6366f1",
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#e5e7eb",
  },
  experienceHeader: {
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  company: {
    fontSize: 11,
    color: "#6b7280",
  },
  dateLocation: {
    fontSize: 9,
    color: "#9ca3af",
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    color: "#4b5563",
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#e5e7eb",
  },
  degree: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  institution: {
    fontSize: 11,
    color: "#6b7280",
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  skillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTag: {
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    fontSize: 9,
    padding: "4 8",
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginTop: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#6366f1",
    borderRadius: 2,
  },
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 2,
  },
  certificateItem: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  certificateName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4b5563",
  },
  certificateDetails: {
    fontSize: 9,
    color: "#9ca3af",
  },
});

interface CreativeTemplateProps {
  data: ResumeState;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryLabels: Record<string, string> = {
    technical: "Technical",
    soft: "Soft Skills",
    tools: "Tools",
    other: "Other",
  };

  const getProficiencyLevel = (proficiency: string) => {
    const levels: Record<string, number> = {
      native: 100,
      fluent: 90,
      professional: 75,
      intermediate: 50,
      basic: 25,
    };
    return levels[proficiency] || 50;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>
                {personalInfo.firstName} {personalInfo.lastName}
              </Text>
              {summary && (
                <Text style={styles.tagline}>
                  {summary.split('.')[0]}.
                </Text>
              )}
              <View style={styles.contactRow}>
                <Text style={styles.contactItem}>📧 {personalInfo.email}</Text>
                <Text style={styles.contactItem}>📱 {personalInfo.phone}</Text>
                <Text style={styles.contactItem}>📍 {personalInfo.location}</Text>
              </View>
              {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
                <View style={styles.contactRow}>
                  {personalInfo.linkedin && (
                    <Text style={styles.contactItem}>🔗 LinkedIn</Text>
                  )}
                  {personalInfo.github && (
                    <Text style={styles.contactItem}>💻 GitHub</Text>
                  )}
                  {personalInfo.website && (
                    <Text style={styles.contactItem}>🌐 Portfolio</Text>
                  )}
                </View>
              )}
            </View>
            {personalInfo.photo && (
              <Image style={styles.profileImage} src={personalInfo.photo} />
            )}
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.twoColumn}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* About */}
              {summary && (
                <View style={styles.section}>
                  <View style={styles.sectionTitle}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitleText}>ABOUT ME</Text>
                  </View>
                  <Text style={styles.description}>{summary}</Text>
                </View>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitle}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitleText}>EXPERIENCE</Text>
                  </View>
                  {experiences.map((exp) => (
                    <View key={exp.id} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.jobTitle}>{exp.position}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                        <Text style={styles.dateLocation}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          {exp.location && ` | ${exp.location}`}
                        </Text>
                      </View>
                      <Text style={styles.description}>{exp.description}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Education */}
              {education.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitle}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitleText}>EDUCATION</Text>
                  </View>
                  {education.map((edu) => (
                    <View key={edu.id} style={styles.educationItem}>
                      <Text style={styles.degree}>
                        {edu.degree} in {edu.fieldOfStudy}
                      </Text>
                      <Text style={styles.institution}>{edu.institution}</Text>
                      <Text style={styles.dateLocation}>
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Skills */}
              {skills.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitle}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitleText}>SKILLS</Text>
                  </View>
                  {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <View key={category} style={styles.skillCategory}>
                      <Text style={styles.skillCategoryTitle}>
                        {categoryLabels[category]}
                      </Text>
                      <View style={styles.skillTags}>
                        {categorySkills.map((skill) => (
                          <Text key={skill.id} style={styles.skillTag}>
                            {skill.name}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitle}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitleText}>LANGUAGES</Text>
                  </View>
                  {languages.map((lang) => (
                    <View key={lang.id} style={styles.languageItem}>
                      <Text style={styles.languageName}>
                        {lang.name} - {lang.proficiency}
                      </Text>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${getProficiencyLevel(lang.proficiency)}%` },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Certificates */}
              {certificates.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitle}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitleText}>CERTIFICATES</Text>
                  </View>
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
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
