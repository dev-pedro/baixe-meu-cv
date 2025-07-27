// lib/pdf/templates/ModernResume.tsx
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { DataCreateCurriculoForm } from '@/app/types/types';
import path from 'path';
import { wrap } from 'module';

Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: path.join(process.cwd(), 'public', 'fonts', 'Montserrat-Regular.ttf'),
    },
    {
      src: path.join(process.cwd(), 'public', 'fonts', 'Montserrat-Bold.ttf'),
      fontWeight: 'bold',
    },
    {
      src: path.join(process.cwd(), 'public', 'fonts', 'Montserrat-Italic.ttf'),
      fontStyle: 'italic',
    },
  ],
});

export const ModernResume = ({ profile }: { profile: DataCreateCurriculoForm }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {profile?.image && <Image src={profile?.image} style={styles.image} />}
        <View style={styles.info}>
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.profession}>{profile?.profession}</Text>
          <Text style={styles.location}>{profile?.city}</Text>
          {profile?.showEmailInPDF && (
            <Text style={styles.contact}>
              {profile?.email === 'baixemeucv@gmail.com'
                ? 'phenrique.coder@gmail.com'
                : profile?.email}
            </Text>
          )}
          {profile?.showPhoneInPDF && <Text style={styles.contact}>{profile?.phone}</Text>}
        </View>
      </View>

      {/* NOTE: Sessão Sobre Mim */}
      {profile?.bio && profile?.bio.length > 0 && (
        <Text style={styles.sectionTitle}>Sobre mim</Text>
      )}
      <Text style={styles.bio}>{profile?.bio}</Text>

      {/* NOTE: Sessão Formação */}
      {profile?.graduation && profile?.graduation?.length > 0 && (
        <Text style={styles.sectionTitle}>Formação</Text>
      )}
      {profile?.graduation?.map((grad, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.title}>{grad.institution}</Text>
          <Text style={styles.subTitle}>
            {grad.name} - {grad.year}
          </Text>
          <Text style={styles.description}>{grad.description}</Text>
        </View>
      ))}

      {/* NOTE: Sessão Experiencias */}
      {profile?.experiences && profile?.experiences.length > 0 && (
        <Text style={styles.sectionTitle}>Experiências</Text>
      )}
      {profile?.experiences?.map((exp, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.title}>
            • {exp.company} ({exp.start} - {exp.end})
          </Text>
          {exp.jobs?.map((job, jIdx) => (
            <View key={jIdx}>
              <Text style={styles.subTitle}>
                {job.function} ({job.start} - {job.end})
              </Text>
              <Text style={styles.description}>{job.description}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* NOTE: Sessão Portifólio */}
      {profile?.portfolio && profile?.portfolio.length > 0 && (
        <Text style={styles.sectionTitle}>Portfólio</Text>
      )}
      {profile?.portfolio?.map((proj, idx) => (
        <View key={idx}>
          <Text style={styles.title}>{proj.name}</Text>
          <Text style={styles.link}>{proj.url}</Text>
          <Text style={styles.description}>Descreição: {proj.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const colors = {
  gray800: '#333333',
  gray700: '#374151',
  blue500: '#3b82f6',
};

const fonts = {
  primary: 'Montserrat',
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    backgroundColor: '#f9fafb', // Similar to Tailwind's gray-100
  },
  header: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // Similar to Tailwind's gray-300
    paddingBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#3b82f6', // Similar to Tailwind's blue-500
    objectFit: 'cover', // simula o efeito de cover
  },
  info: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: '#1f2937', // Similar to Tailwind's gray-800
  },
  profession: {
    fontSize: 12,
    fontStyle: 'italic',
    fontFamily: 'Montserrat',
    color: '#4b5563', // Similar to Tailwind's gray-600
  },
  location: {
    marginTop: 4,
    color: '#6b7280', // Similar to Tailwind's gray-500
  },
  contact: {
    marginTop: 2,
    color: '#6b7280', // Similar to Tailwind's gray-500
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937', // Similar to Tailwind's gray-800
  },
  bio: {
    marginTop: 5,
    lineHeight: 1.5,
    color: '#374151', // Similar to Tailwind's gray-700
  },
  section: {
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#111111', // Similar to Tailwind's gray-800
  },
  subTitle: {
    fontSize: 11,
    marginLeft: 8,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#222222', // Similar to Tailwind's gray-800
  },
  description: {
    fontSize: 9,
    fontFamily: fonts.primary,
    fontStyle: 'normal',
    marginLeft: 10,
    marginTop: 5,
    color: colors.gray800,
  },
  gradInfo: {
    color: '#374151', // Similar to Tailwind's gray-700
  },
  link: {
    marginLeft: 12,
    marginTop: 2,
    fontWeight: 'bold',
    color: '#3b82f6', // azul
  },
});
