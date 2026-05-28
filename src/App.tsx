import React, { useEffect } from "react";
const HomePageRSUMLA = React.lazy(() => import("./pages/HomePageRSUMLA"));
const TentangKami = React.lazy(() => import("./pages/TentangKami"));
const JadwalDokter = React.lazy(() => import("./pages/JadwalDokter"));
const Home = React.lazy(() => import("./pages/Home"));
const PortalLogin = React.lazy(
  () => import("./pages/PortalPasien/PortalLogin"),
);
const PatientLayout = React.lazy(
  () => import("./pages/PortalPasien/PatientLayout"),
);
const PatientSummary = React.lazy(
  () => import("./pages/PortalPasien/PatientSummary"),
);
const PatientRME = React.lazy(() => import("./pages/PortalPasien/PatientRME"));
const PatientRegistration = React.lazy(
  () => import("./pages/PortalPasien/PatientRegistration"),
);
const PendaftaranOnline = React.lazy(
  () => import("./pages/PendaftaranOnline/PendaftaranOnline"),
);
const PPID = React.lazy(() => import("./pages/PPID"));
const Tupoksi = React.lazy(() => import("./pages/Tupoksi"));
const VisiMisi = React.lazy(() => import("./pages/VisiMisi"));
const Kedudukan = React.lazy(() => import("./pages/Kedudukan"));
const RujukanKabupaten = React.lazy(() => import("./pages/RujukanKabupaten"));
const GenericPage = React.lazy(() => import("./pages/GenericPage"));
const SDM = React.lazy(() => import("./pages/SDM"));
const StrukturOrganisasi = React.lazy(() => import("./pages/StrukturOrganisasi"));
const PatientTagihan = React.lazy(
  () => import("./pages/PortalPasien/PatientTagihan"),
);
const PatientLab = React.lazy(() => import("./pages/PortalPasien/PatientLab"));
const PatientTelemedisin = React.lazy(
  () => import("./pages/PortalPasien/PatientTelemedisin"),
);
const PortalKaryawanLayout = React.lazy(
  () => import("./pages/PortalKaryawan/PortalKaryawanLayout"),
);
const PortalKaryawanLogin = React.lazy(
  () => import("./pages/PortalKaryawan/LoginPage"),
);
const PortalKaryawanDashboard = React.lazy(
  () => import("./pages/PortalKaryawan/DashboardPage"),
);
const SRMLayout = React.lazy(() => import("./pages/SRM/SRMLayout"));
const SRMDashboard = React.lazy(() => import("./pages/SRM/SRMDashboard"));
const SRMAntrian = React.lazy(() => import("./pages/SRM/SRMAntrian"));
const SRMAntrianTV = React.lazy(() => import("./pages/SRM/SRMAntrianTV"));
const SRMRekamMedis = React.lazy(() => import("./pages/SRM/SRMRekamMedis"));
const SRMPasien = React.lazy(() => import("./pages/SRM/SRMPasien"));
const SRMPengaturan = React.lazy(() => import("./pages/SRM/SRMPengaturan"));
const SRMIntegrasi = React.lazy(() => import("./pages/SRM/SRMIntegrasi"));
const SRMKunjungan = React.lazy(() => import("./pages/SRM/SRMKunjungan"));
const SRMJadwalDokter = React.lazy(() => import("./pages/SRM/SRMJadwalDokter"));
const SRMBPJS = React.lazy(() => import("./pages/SRM/SRMBPJS"));
const SRMPencarian = React.lazy(() => import("./pages/SRM/SRMPencarian"));
const SRMLaporanPDF = React.lazy(() => import("./pages/SRM/SRMLaporanPDF"));
const SRMWaReminder = React.lazy(() => import("./pages/SRM/SRMWaReminder"));
const SRMVaksinasi = React.lazy(() => import("./pages/SRM/SRMVaksinasi"));
const SRMLaporan = React.lazy(() => import("./pages/SRM/SRMLaporan"));
const SRMDataMaster = React.lazy(() => import("./pages/SRM/SRMDataMaster"));
const SRMPassword = React.lazy(() => import("./pages/SRM/SRMPassword"));
const SRMRegister = React.lazy(() => import("./pages/SRM/SRMRegister"));
const ComingSoon = React.lazy(() => import("./components/ComingSoon"));
const OfficeLayout = React.lazy(() => import("./pages/Office/OfficeLayout"));
const OfficeLogin = React.lazy(() => import("./pages/Office/OfficeLogin"));
const OfficeDashboard = React.lazy(
  () => import("./pages/Office/OfficeDashboard"),
);
const OfficeNotaDinas = React.lazy(
  () => import("./pages/Office/OfficeNotaDinas"),
);
const OfficeESS = React.lazy(() => import("./pages/Office/OfficeESS"));
const OfficeShift = React.lazy(() => import("./pages/Office/OfficeShift"));
const OfficeCalendar = React.lazy(
  () => import("./pages/Office/OfficeCalendar"),
);
const OfficeTicketing = React.lazy(
  () => import("./pages/Office/OfficeTicketing"),
);
const OfficePatrol = React.lazy(() => import("./pages/Office/OfficePatrol"));
const OfficeFinance = React.lazy(() => import("./pages/Office/OfficeFinance"));
const OfficeAudit = React.lazy(() => import("./pages/Office/OfficeAudit"));
const OfficeFleet = React.lazy(() => import("./pages/Office/OfficeFleet"));
const OfficeELearning = React.lazy(
  () => import("./pages/Office/OfficeELearning"),
);
const OfficeHRD = React.lazy(() => import("./pages/Office/OfficeHRD"));
const OfficeHRAnalytics = React.lazy(
  () => import("./pages/Office/OfficeHRAnalytics"),
);
const OfficeChat = React.lazy(() => import("./pages/Office/OfficeChat"));
const OfficeFeedback = React.lazy(
  () => import("./pages/Office/OfficeFeedback"),
);
const OfficeAssets = React.lazy(() => import("./pages/Office/OfficeAssets"));
const OfficeRecruitment = React.lazy(
  () => import("./pages/Office/OfficeRecruitment"),
);
const OfficeProcurement = React.lazy(
  () => import("./pages/Office/OfficeProcurement"),
);
const OfficeArchive = React.lazy(() => import("./pages/Office/OfficeArchive"));
const OfficeRoomBooking = React.lazy(
  () => import("./pages/Office/OfficeRoomBooking"),
);
const OfficeAppraisal = React.lazy(
  () => import("./pages/Office/OfficeAppraisal"),
);
const OfficeContracts = React.lazy(
  () => import("./pages/Office/OfficeContracts"),
);
const OfficeInventory = React.lazy(
  () => import("./pages/Office/OfficeInventory"),
);
const OfficeDietitian = React.lazy(
  () => import("./pages/Office/OfficeDietitian"),
);
const OfficeLaundry = React.lazy(() => import("./pages/Office/OfficeLaundry"));
const OfficeCSSD = React.lazy(() => import("./pages/Office/OfficeCSSD"));
const OfficeIncidents = React.lazy(
  () => import("./pages/Office/OfficeIncidents"),
);
const OfficeWasteManagement = React.lazy(
  () => import("./pages/Office/OfficeWasteManagement"),
);
const OfficeBiomedical = React.lazy(
  () => import("./pages/Office/OfficeBiomedical"),
);
const OfficeCasemix = React.lazy(() => import("./pages/Office/OfficeCasemix"));
const OfficeBloodBank = React.lazy(
  () => import("./pages/Office/OfficeBloodBank"),
);
const OfficeDocumentControl = React.lazy(
  () => import("./pages/Office/OfficeDocumentControl"),
);
const OfficeITSupport = React.lazy(
  () => import("./pages/Office/OfficeITSupport"),
);
const OfficeLegal = React.lazy(() => import("./pages/Office/OfficeLegal"));
const OfficeMorgue = React.lazy(() => import("./pages/Office/OfficeMorgue"));
const OfficeLabAdmin = React.lazy(
  () => import("./pages/Office/OfficeLabAdmin"),
);
const OfficeRadiologyAdmin = React.lazy(
  () => import("./pages/Office/OfficeRadiologyAdmin"),
);
const OfficeBedManagement = React.lazy(
  () => import("./pages/Office/OfficeBedManagement"),
);
const OfficeHemodialysisAdmin = React.lazy(
  () => import("./pages/Office/OfficeHemodialysisAdmin"),
);
const OfficeSecurity = React.lazy(
  () => import("./pages/Office/OfficeSecurity"),
);
const OfficeParking = React.lazy(() => import("./pages/Office/OfficeParking"));
const OfficeSpiritual = React.lazy(
  () => import("./pages/Office/OfficeSpiritual"),
);
const OfficeCredentials = React.lazy(
  () => import("./pages/Office/OfficeCredentials"),
);
const OfficePPI = React.lazy(() => import("./pages/Office/OfficePPI"));
const OfficeQuality = React.lazy(() => import("./pages/Office/OfficeQuality"));
const OfficeK3RS = React.lazy(() => import("./pages/Office/OfficeK3RS"));
const OfficeDiklit = React.lazy(() => import("./pages/Office/OfficeDiklit"));
const OfficeRMAdmin = React.lazy(() => import("./pages/Office/OfficeRMAdmin"));
const OfficeNutritionMfg = React.lazy(
  () => import("./pages/Office/OfficeNutritionMfg"),
);
const OfficeGasMedis = React.lazy(
  () => import("./pages/Office/OfficeGasMedis"),
);
const OfficeCallCenter = React.lazy(
  () => import("./pages/Office/OfficeCallCenter"),
);
const OfficePharmacyAdmin = React.lazy(
  () => import("./pages/Office/OfficePharmacyAdmin"),
);
const OfficePhysiotherapy = React.lazy(
  () => import("./pages/Office/OfficePhysiotherapy"),
);
const OfficeDischarge = React.lazy(
  () => import("./pages/Office/OfficeDischarge"),
);
const OfficeOutpatient = React.lazy(
  () => import("./pages/Office/OfficeOutpatient"),
);
const OfficeInpatient = React.lazy(
  () => import("./pages/Office/OfficeInpatient"),
);
const OfficeSurgery = React.lazy(() => import("./pages/Office/OfficeSurgery"));
const OfficeICU = React.lazy(() => import("./pages/Office/OfficeICU"));
const OfficeNICU = React.lazy(() => import("./pages/Office/OfficeNICU"));
const OfficeEmergency = React.lazy(
  () => import("./pages/Office/OfficeEmergency"),
);
const OfficeMCU = React.lazy(() => import("./pages/Office/OfficeMCU"));
const OfficeBloodDonor = React.lazy(
  () => import("./pages/Office/OfficeBloodDonor"),
);
const OfficeCathlab = React.lazy(() => import("./pages/Office/OfficeCathlab"));
const OfficeEndoscopy = React.lazy(
  () => import("./pages/Office/OfficeEndoscopy"),
);
const OfficeVIPClinic = React.lazy(
  () => import("./pages/Office/OfficeVIPClinic"),
);
const OfficeHomecare = React.lazy(
  () => import("./pages/Office/OfficeHomecare"),
);
const OfficeDeveloperWeb = React.lazy(
  () => import("./pages/Office/OfficeDeveloperWeb"),
);
const OfficeTelemedicine = React.lazy(
  () => import("./pages/Office/OfficeTelemedicine"),
);
const OfficeMedicalTourism = React.lazy(
  () => import("./pages/Office/OfficeMedicalTourism"),
);
const OfficeInsurance = React.lazy(
  () => import("./pages/Office/OfficeInsurance"),
);
const OfficeInternalAudit = React.lazy(
  () => import("./pages/Office/OfficeInternalAudit"),
);
const OfficeEthics = React.lazy(() => import("./pages/Office/OfficeEthics"));
const OfficeClinicalPharm = React.lazy(
  () => import("./pages/Office/OfficeClinicalPharm"),
);
const OfficeForensic = React.lazy(
  () => import("./pages/Office/OfficeForensic"),
);
const OfficeHealthPromo = React.lazy(
  () => import("./pages/Office/OfficeHealthPromo"),
);
const OfficeResearch = React.lazy(
  () => import("./pages/Office/OfficeResearch"),
);
const OfficeLibrary = React.lazy(() => import("./pages/Office/OfficeLibrary"));
const OfficeMess = React.lazy(() => import("./pages/Office/OfficeMess"));
const OfficeDaycare = React.lazy(() => import("./pages/Office/OfficeDaycare"));
const OfficeNutritionCare = React.lazy(
  () => import("./pages/Office/OfficeNutritionCare"),
);
const OfficePalliative = React.lazy(
  () => import("./pages/Office/OfficePalliative"),
);
const OfficeOptic = React.lazy(() => import("./pages/Office/OfficeOptic"));
const PortalKaryawanBerkas = React.lazy(
  () => import("./pages/PortalKaryawan/PortalKaryawanBerkas"),
);
const PortalKaryawanGaji = React.lazy(
  () => import("./pages/PortalKaryawan/PortalKaryawanGaji"),
);
const PortalKaryawanCuti = React.lazy(
  () => import("./pages/PortalKaryawan/PortalKaryawanCuti"),
);
const PortalKaryawanJadwal = React.lazy(
  () => import("./pages/PortalKaryawan/PortalKaryawanJadwal"),
);
const PortalKaryawanAbsensi = React.lazy(
  () => import("./pages/PortalKaryawan/PortalKaryawanAbsensi"),
);
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Portal Pasien Baru

// Portal Karyawan

import { registerSW } from "./pwaSetup";
import { FirebaseProvider } from "./FirebaseProvider";

// SRM Pages

// NEW 10 FEATURES

// NEW 20 FEATURES

// NEW 30 FEATURES

import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    registerSW();
  }, []);

  return (
    <FirebaseProvider>
      <React.Suspense
        fallback={
          <div className="flex h-screen items-center justify-center p-4 bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        }
      >
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePageRSUMLA />} />
            <Route path="/profil/tentang-kami" element={<TentangKami />} />
            <Route path="/profil/tupoksi" element={<Tupoksi />} />
            <Route path="/profil/visi-misi" element={<VisiMisi />} />
            <Route path="/profil/kedudukan" element={<Kedudukan />} />
            <Route
              path="/profil/struktur-organisasi"
              element={<StrukturOrganisasi />}
            />
            <Route
              path="/profil/sumber-daya-manusia"
              element={<SDM />}
            />
            <Route path="/profil/penghargaan-haki" element={<GenericPage />} />

            <Route
              path="/pelayanan/rujukan-kabupaten"
              element={<RujukanKabupaten />}
            />
            <Route path="/pelayanan/rawat-jalan" element={<GenericPage />} />
            <Route path="/pelayanan/rawat-inap" element={<GenericPage />} />
            <Route path="/pelayanan/gawat-darurat" element={<GenericPage />} />
            <Route path="/pelayanan/graha-amerta" element={<GenericPage />} />
            <Route path="/pelayanan/informasi" element={<GenericPage />} />
            <Route
              path="/pelayanan/standar-pelayanan"
              element={<GenericPage />}
            />
            <Route path="/pelayanan/panduan-klinik" element={<GenericPage />} />

            <Route path="/diklat/diklat" element={<GenericPage />} />
            <Route path="/diklat/litbang" element={<GenericPage />} />
            <Route path="/diklat/webinar" element={<GenericPage />} />

            <Route path="/promkes" element={<GenericPage />} />
            <Route path="/laporan" element={<GenericPage />} />
            <Route path="/reformasi-birokrasi" element={<GenericPage />} />
            <Route path="/pengaduan" element={<GenericPage />} />

            <Route path="/ppid" element={<PPID />} />
            <Route path="/jadwal-dokter" element={<JadwalDokter />} />

            {/* Pendaftaran Online (Public) */}
            <Route path="/pendaftaran-online" element={<PendaftaranOnline />} />

            {/* Portal Pasien & RME */}
            <Route path="/portal/pendaftaran" element={<PortalLogin />} />
            <Route element={<PatientLayout />}>
              <Route
                path="/portal/pendaftaran/dashboard"
                element={<PatientSummary />}
              />
              <Route path="/portal/pendaftaran/rme" element={<PatientRME />} />
              <Route
                path="/portal/pendaftaran/daftar"
                element={<PatientRegistration />}
              />
              <Route
                path="/portal/pendaftaran/tagihan"
                element={<PatientTagihan />}
              />
              <Route path="/portal/pendaftaran/lab" element={<PatientLab />} />
              <Route
                path="/portal/pendaftaran/telemedisin"
                element={<PatientTelemedisin />}
              />
            </Route>
            
            {/* Portal Karyawan */}
            <Route
              path="/karyawan/login"
              element={<Navigate to="/office/login" replace />}
            />
            <Route path="/karyawan" element={<PortalKaryawanLayout />}>
              <Route
                index
                element={<Navigate to="/karyawan/dashboard" replace />}
              />
              <Route path="dashboard" element={<PortalKaryawanDashboard />} />
              <Route path="absensi" element={<PortalKaryawanAbsensi />} />
              <Route path="jadwal" element={<PortalKaryawanJadwal />} />
              <Route path="cuti" element={<PortalKaryawanCuti />} />
              <Route path="slip-gaji" element={<PortalKaryawanGaji />} />
              <Route path="berkas" element={<PortalKaryawanBerkas />} />
              <Route
                path="*"
                element={<ComingSoon title="Portal Karyawan" />}
              />
            </Route>

            {/* Office Routes */}
            <Route path="/office/login" element={<OfficeLogin />} />
            <Route path="/office" element={<OfficeLayout />}>
              <Route
                index
                element={<Navigate to="/office/dashboard" replace />}
              />
              <Route path="dashboard" element={<OfficeDashboard />} />
              <Route path="nota-dinas" element={<OfficeNotaDinas />} />
              <Route path="ess" element={<OfficeESS />} />
              <Route path="shift" element={<OfficeShift />} />
              <Route path="calendar" element={<OfficeCalendar />} />
              <Route path="ticketing" element={<OfficeTicketing />} />
              <Route path="patrol" element={<OfficePatrol />} />
              <Route path="finance" element={<OfficeFinance />} />
              <Route path="audit" element={<OfficeAudit />} />
              <Route path="fleet" element={<OfficeFleet />} />
              <Route path="elearning" element={<OfficeELearning />} />
              <Route path="hr-analytics" element={<OfficeHRAnalytics />} />
              <Route path="hr-management" element={<OfficeHRD />} />
              <Route path="chat" element={<OfficeChat />} />
              <Route path="feedback" element={<OfficeFeedback />} />
              <Route path="assets" element={<OfficeAssets />} />
              <Route path="recruitment" element={<OfficeRecruitment />} />
              <Route path="procurement" element={<OfficeProcurement />} />
              <Route path="archive" element={<OfficeArchive />} />
              <Route path="room-booking" element={<OfficeRoomBooking />} />
              <Route path="appraisal" element={<OfficeAppraisal />} />
              <Route path="contracts" element={<OfficeContracts />} />

              {/* NEW 10 FEATURES ROUTES */}
              <Route path="inventory" element={<OfficeInventory />} />
              <Route path="dietitian" element={<OfficeDietitian />} />
              <Route path="laundry" element={<OfficeLaundry />} />
              <Route path="cssd" element={<OfficeCSSD />} />
              <Route path="incidents" element={<OfficeIncidents />} />
              <Route path="waste" element={<OfficeWasteManagement />} />
              <Route path="biomedical" element={<OfficeBiomedical />} />
              <Route path="casemix" element={<OfficeCasemix />} />
              <Route path="blood-bank" element={<OfficeBloodBank />} />
              <Route path="doc-control" element={<OfficeDocumentControl />} />

              {/* NEW 20 FEATURES ROUTES */}
              <Route path="it-support" element={<OfficeITSupport />} />
              <Route path="legal" element={<OfficeLegal />} />
              <Route path="morgue" element={<OfficeMorgue />} />
              <Route path="lab-admin" element={<OfficeLabAdmin />} />
              <Route
                path="radiology-admin"
                element={<OfficeRadiologyAdmin />}
              />
              <Route path="bed-management" element={<OfficeBedManagement />} />
              <Route
                path="hemodialysis-admin"
                element={<OfficeHemodialysisAdmin />}
              />
              <Route path="security" element={<OfficeSecurity />} />
              <Route path="parking" element={<OfficeParking />} />
              <Route path="spiritual" element={<OfficeSpiritual />} />
              <Route path="credentials" element={<OfficeCredentials />} />
              <Route path="ppi" element={<OfficePPI />} />
              <Route path="quality" element={<OfficeQuality />} />
              <Route path="k3rs" element={<OfficeK3RS />} />
              <Route path="diklit" element={<OfficeDiklit />} />
              <Route path="rm-admin" element={<OfficeRMAdmin />} />
              <Route path="nutrition-mfg" element={<OfficeNutritionMfg />} />
              <Route path="gas-medis" element={<OfficeGasMedis />} />
              <Route path="call-center" element={<OfficeCallCenter />} />

              {/* NEW 30 FEATURES ROUTES */}
              <Route path="pharmacy-admin" element={<OfficePharmacyAdmin />} />
              <Route path="physiotherapy" element={<OfficePhysiotherapy />} />
              <Route path="discharge" element={<OfficeDischarge />} />
              <Route path="outpatient" element={<OfficeOutpatient />} />
              <Route path="inpatient" element={<OfficeInpatient />} />
              <Route path="surgery" element={<OfficeSurgery />} />
              <Route path="icu" element={<OfficeICU />} />
              <Route path="nicu" element={<OfficeNICU />} />
              <Route path="emergency" element={<OfficeEmergency />} />
              <Route path="mcu" element={<OfficeMCU />} />
              <Route path="blood-donor" element={<OfficeBloodDonor />} />
              <Route path="cathlab" element={<OfficeCathlab />} />
              <Route path="endoscopy" element={<OfficeEndoscopy />} />
              <Route path="vip-clinic" element={<OfficeVIPClinic />} />
              <Route path="homecare" element={<OfficeHomecare />} />
              <Route path="developer-web" element={<OfficeDeveloperWeb />} />
              <Route path="telemedicine" element={<OfficeTelemedicine />} />
              <Route
                path="medical-tourism"
                element={<OfficeMedicalTourism />}
              />
              <Route path="insurance" element={<OfficeInsurance />} />
              <Route path="internal-audit" element={<OfficeInternalAudit />} />
              <Route path="ethics" element={<OfficeEthics />} />
              <Route path="clinical-pharm" element={<OfficeClinicalPharm />} />
              <Route path="forensic" element={<OfficeForensic />} />
              <Route path="health-promo" element={<OfficeHealthPromo />} />
              <Route path="research" element={<OfficeResearch />} />
              <Route path="library" element={<OfficeLibrary />} />
              <Route path="mess" element={<OfficeMess />} />
              <Route path="daycare" element={<OfficeDaycare />} />
              <Route path="nutrition-care" element={<OfficeNutritionCare />} />
              <Route path="palliative" element={<OfficePalliative />} />
              <Route path="optic" element={<OfficeOptic />} />

              <Route path="*" element={<ComingSoon title="Modul Office" />} />
            </Route>

            {/* SRM Routes */}
            <Route path="/srm/antrian-tv" element={<SRMAntrianTV />} />
            <Route path="/srm" element={<SRMLayout />}>
              <Route index element={<Navigate to="/srm/dashboard" replace />} />
              <Route path="dashboard" element={<SRMDashboard />} />
              <Route path="antrian" element={<SRMAntrian />} />
              <Route path="rekam-medis" element={<SRMRekamMedis />} />
              <Route path="pasien" element={<SRMPasien />} />
              <Route path="pengaturan" element={<SRMPengaturan />} />
              <Route path="integrasi/satusehat" element={<SRMIntegrasi />} />
              <Route path="integrasi/bpjs" element={<SRMBPJS />} />
              <Route path="kunjungan" element={<SRMKunjungan />} />
              <Route path="jadwal-dokter" element={<SRMJadwalDokter />} />
              <Route path="pencarian" element={<SRMPencarian />} />
              <Route path="master/:type" element={<SRMDataMaster />} />
              <Route path="laporan-pdf" element={<SRMLaporanPDF />} />
              <Route path="wa-reminder" element={<SRMWaReminder />} />
              <Route path="password" element={<SRMPassword />} />
              <Route path="register" element={<SRMRegister />} />
              <Route path="vaksinasi" element={<SRMVaksinasi />} />
              <Route path="laporan" element={<SRMLaporan />} />
              <Route
                path="*"
                element={<ComingSoon title="Halaman Tidak Ditemukan" />}
              />
            </Route>
          </Routes>
        </Router>
      </React.Suspense>
    </FirebaseProvider>
  );
}

export default App;
