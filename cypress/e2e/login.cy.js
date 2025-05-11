describe('Login Input Form', () => {
  beforeEach(() => {
    // Sebelum setiap tes, buka aplikasi di port yang benar
    cy.visit('http://localhost:3003'); // Ganti dengan URL aplikasi Anda (port 3002)
  });

  it('should allow user to login with valid credentials', () => {
    // Temukan elemen input email dan masukkan email
    cy.get('input[type="email"]')
      .type('cypress@gmail.com')
      .should('have.value', 'cypress@gmail.com');

    // Temukan elemen input password dan masukkan password
    cy.get('input[type="password"]')
      .type('123456')
      .should('have.value', '123456');

    // Klik tombol login
    cy.get('button[type="submit"]').click();

    // Tunggu beberapa waktu untuk memastikan halaman dialihkan setelah login
    cy.wait(3000); // Sesuaikan waktu tunggu sesuai kebutuhan, misalnya 3000ms (3 detik)

    // Periksa apakah URL mengandung '/dashboard' setelah login berhasil

    // Verifikasi bahwa elemen tertentu ada setelah login berhasil
    // Ganti dengan elemen yang sesuai setelah login, misalnya username atau lainnya
  });

  it('should show validation errors when fields are empty', () => {
    // Coba submit form tanpa mengisi email dan password
    cy.get('button[type="submit"]').click();

    // Verifikasi jika elemen kesalahan validasi muncul
    cy.get('.login-input:invalid').should('have.length', 2); // Pastikan ada dua input yang invalid
  });
});
