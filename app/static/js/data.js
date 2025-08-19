function loadNewsTable() {
    fetch('/load-combine-news')
        .then(res => res.json())
        .then(result => {
            const data = result.data || [];
            const lastUpdateNews = result.tanggal_terbaru || 'Tidak tersedia';
            console.log("DATA LOADED:", data);
            // === Cari tanggal terbaru (max) dari kolom DATE_STANDARDIZED ===
            document.getElementById('last-update-news').textContent = lastUpdateNews;
            // === Cari tanggal terbaru (max) dari kolom DATE_STANDARDIZED ===
            const dates = data
                .map(row => row.news_date)
                .filter(d => d); // buang null/undefined

            if (dates.length > 0) {
                const maxDate = new Date(Math.max(...dates.map(d => new Date(d))));
                const maxDateStr = maxDate.toISOString().split('T')[0]; // format YYYY-MM-DD

                // Set batas maksimal di date picker
                document.getElementById("startDate").setAttribute("max", maxDateStr);
                document.getElementById("endDate").setAttribute("max", maxDateStr);
            }
            const tbody = document.querySelector('#NewsTable tbody');
            tbody.innerHTML = '';

            data.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${row.news_id || ''}</td>
                    <td>${row.news_date || ''}</td>
                    <td><a href="${row.link || '#'}" target="_blank">Lihat</a></td>
                    <td>${row.title || ''}</td>
                    <td>${(row.content || '').slice(0, 200)}...</td>
                `;
                tbody.appendChild(tr);
            });

            const table = $('#NewsTable').DataTable({
                destroy: true,
                scrollX: false,
                paging: true,
                searching: true,
            });

            // Hapus filter lama
            $.fn.dataTable.ext.search = $.fn.dataTable.ext.search.filter(f => !(f._tableId === 'NewsTable'));

            // Tambahkan filter keyword + tanggal
            const newsFilter = function (settings, data, dataIndex) {
                if (settings.nTable.id !== 'NewsTable') return true;

                const keyword = $('#NewsTable_filter input').val().trim().toLowerCase();
                if (keyword) {
                    let match = false;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].toLowerCase().includes(keyword)) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) return false;
                }

                // === Filter Tanggal ===
                const startDate = $('#startDate').val();
                const endDate = $('#endDate').val();
                const colDate = data[2]; // kolom Tanggal (indeks ke-2)

                if (colDate) {
                    const rowDate = new Date(colDate);
                    if (startDate && rowDate < new Date(startDate)) return false;
                    if (endDate && rowDate > new Date(endDate)) return false;
                }
                return true;
            };
            newsFilter._tableId = 'NewsTable';
            $.fn.dataTable.ext.search.push(newsFilter);

            // Event listener
            $('#NewsTable_filter input').off().on('input', function () {
                table.draw();
            });
            $('#startDate, #endDate').off().on('change', function () {
                table.draw();
            });
        })
        .catch(err => {
            console.error("Gagal load news table:", err);
        });
}


function loadExtractionTable() {
    fetch('/load-extraction-news')
        .then(res => res.json())
        .then(result => {
            const data = result.data || [];
            const lastUpdateExtraction = result.tanggal_terbaru || 'Tidak tersedia';
            console.log("DATA LOADED:", data);
            document.getElementById('last-update-extraction').textContent = lastUpdateExtraction;

            // === Cari tanggal terbaru (max) dari kolom DATE_STANDARDIZED ===
            const dates = data
                .map(row => row.DATE_STANDARDIZED)
                .filter(d => d); // buang null/undefined

            if (dates.length > 0) {
                const maxDate = new Date(Math.max(...dates.map(d => new Date(d))));
                const maxDateStr = maxDate.toISOString().split('T')[0]; // format YYYY-MM-DD

                // Set batas maksimal di date picker
                document.getElementById("startExtractionDate").setAttribute("max", maxDateStr);
                document.getElementById("endExtractionDate").setAttribute("max", maxDateStr);
            }

            const tbody = document.querySelector('#ExtractionTable tbody');
            if (!tbody) {
                console.error("Tbody tidak ditemukan!");
                return;
            }

            tbody.innerHTML = '';

            data.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${row.news_id || ''}</td>
                    <td>${row.LOC || ''}</td>
                    <td>${row.DAY || ''}</td>
                    <td>${row.DATE_STANDARDIZED || ''}</td>
                    <td>${row.TIME || ''}</td>
                    <td>${row.VEHICLE || ''}</td>
                    <td>${row.MERK || ''}</td>
                    <td>${row.ROAD || ''}</td>
                    <td>${row.CAUSE || ''}</td>
                    <td>${row.ORG || ''}</td>
                    <td>${row.DRIVER_AGE || ''}</td>
                    <td>${row.VICTIM_AGE || ''}</td>
                    <td>${row.INJURY || ''}</td>
                    <td>${row.DEATH || ''}</td>
                `;
                tbody.appendChild(tr);
            });

            const table = $('#ExtractionTable').DataTable({
                destroy: true,
                scrollX: false,
                paging: true,
                searching: true,
            });

            // Hapus filter lama untuk ExtractionTable
            $.fn.dataTable.ext.search = $.fn.dataTable.ext.search.filter(f => !(f._tableId === 'ExtractionTable'));

            // Tambahkan filter keyword + tanggal khusus ExtractionTable
            const extractionFilter = function (settings, data, dataIndex) {
                if (settings.nTable.id !== 'ExtractionTable') return true;

                // Filter keyword
                const keyword = $('#ExtractionTable_filter input').val().trim().toLowerCase();
                if (keyword) {
                    let match = false;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].toLowerCase().includes(keyword)) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) return false;
                }

                // === Filter Tanggal ===
                const startDate = $('#startExtractionDate').val();
                const endDate = $('#endExtractionDate').val();
                const colDate = data[4]; // kolom Tanggal (indeks ke-4)

                if (colDate) {
                    const rowDate = new Date(colDate);
                    if (startDate && rowDate < new Date(startDate)) return false;
                    if (endDate && rowDate > new Date(endDate)) return false;
                }
                return true;
            };
            extractionFilter._tableId = 'ExtractionTable';
            $.fn.dataTable.ext.search.push(extractionFilter);

            // Event listener untuk input
            $('#ExtractionTable_filter input').off().on('input', function () {
                table.draw();
            });
            $('#startExtractionDate, #endExtractionDate').off().on('change', function () {
                table.draw();
            });
        })
        .catch(err => {
            console.error("Gagal load extraction table:", err);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    loadNewsTable();
    loadExtractionTable();
});
