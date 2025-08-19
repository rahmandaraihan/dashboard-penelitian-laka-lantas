function loadClassificationTable() {
    fetch('/load-classification-data')
        .then(res => res.json())
        .then(result => {
            // console.log("DATA LOADED:", data); // 👈 Tambahkan ini

            const data = result.data || [];
            const lastUpdate = result.tanggal_terbaru || 'Tidak tersedia';

            // Tampilkan tanggal terbaru ke elemen HTML
            document.getElementById('last-update-classification').textContent = lastUpdate;
            const tbody = document.querySelector('#ClassificationTable tbody');
            if (!tbody) {
                console.error("Tbody tidak ditemukan!");
                return;
            }

            tbody.innerHTML = '';

            data.forEach((row, index) => {
                console.log("ROW:", row); // 👈 Tambahkan ini juga

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${row.DAY}</td>
                    <td>${row.TIME}</td>
                    <td>${row.VEHICLE}</td>
                    <td>${row.ROAD}</td>
                    <td>${row.CAUSE}</td>
                    <td>${row.DRIVER_AGE}</td>
                    <td>${row.DEATH}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error("Gagal load Classification table:", err);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    loadClassificationTable();
});

document.getElementById("btn-download-classification").addEventListener("click", function (event) {
    event.preventDefault(); // Cegah reload atau pindah halaman

    fetch('/download-classification-table')
        .then(response => {
            if (!response.ok) {
                alert("File tidak ada");
                throw new Error("File tidak ada");
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dataset_klasifikasi_lengkap.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.error(err);
        });
});

const result1 = `Jika waktu kejadian bukan pagi hari, usia pengemudi bukan di bawah umur, penyebab bukan faktor lingkungan dan bukan faktor jalan, dan hari kejadian hari kerja, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result2 = `Jika waktu kejadian bukan pagi hari dan bukan siang hari, usia pengemudi bukan di bawah umur, penyebab bukan faktor lingkungan dan bukan faktor jalan, dan hari kejadian akhir pekan, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result3 = `Jika waktu kejadian bukan pagi hari, tetapi di siang hari, usia pengemudi bukan di bawah umur, penyebab bukan faktor lingkungan dan bukan faktor jalan, hari kejadian akhir pekan, dan jenis jalan adalah jalan tol, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result4 = `Jika waktu kejadian bukan pagi hari, tetapi di siang hari, usia pengemudi bukan di bawah umur, penyebab bukan faktor lingkungan dan bukan faktor jalan, hari kejadian akhir pekan, dan jenis jalan adalah bukan jalan tol, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result5 = `Jika waktu kejadian bukan pagi hari, usia pengemudi bukan di bawah umur, penyebab bukan faktor lingkungan, tetapi faktor jalan, dan jenis kendaraan adalah bukan kendaraan berat, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result6 = `Jika waktu kejadian bukan pagi hari, usia pengemudi bukan di bawah umur, penyebab bukan faktor lingkungan, tetapi faktor jalan, dan jenis kendaraan adalah kendaraan berat, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result7 = `Jika waktu kejadian bukan pagi hari, usia pengemudi bukan di bawah umur, dan penyebab faktor lingkungan, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result8 = `Jika waktu kejadian bukan pagi hari dan bukan di sore hari, dan usia pengemudi di bawah umur, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result9 = `Jika waktu kejadian bukan pagi hari, tetapi di sore hari, dan usia pengemudi di bawah umur, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result10 = `Jika waktu kejadian pagi hari, hari kejadian akhir pekan, dan usia pengemudi bukan usia ideal, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result11 = `Jika waktu kejadian pagi hari, hari kejadian akhir pekan, dan usia pengemudi usia ideal, jenis kendaraan bukan kendaraan ringan, dan penyebab bukan faktor jalan, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result12 = `Jika waktu kejadian pagi hari, hari kejadian akhir pekan, dan usia pengemudi usia ideal, jenis kendaraan bukan kendaraan ringan, dan penyebab faktor jalan, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result13 = `Jika waktu kejadian pagi hari, hari kejadian akhir pekan, dan usia pengemudi usia ideal, jenis kendaraan kendaraan ringan, dan penyebab bukan faktor manusia, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result14 = `Jika waktu kejadian pagi hari, hari kejadian akhir pekan, dan usia pengemudi usia ideal, jenis kendaraan kendaraan ringan, dan penyebab faktor manusia, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result15 = `Jika waktu kejadian pagi hari, hari kejadian hari kerja, penyebab bukan faktor kendaraan, dan usia pengemudi bukan di bawah umur, maka kecelakaan lalu lintas menyebabkan korban jiwa.`;

const result16 = `Jika waktu kejadian pagi hari, hari kejadian hari kerja, penyebab bukan faktor kendaraan, dan usia pengemudi di bawah umur, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;

const result17 = `Jika waktu kejadian pagi hari, hari kejadian hari kerja, dan penyebab adalah faktor kendaraan, maka kecelakaan lalu lintas tidak menyebabkan korban jiwa.`;
const tree = {
    "question": "Waktu Kejadian?",
    "options": {
        "Bukan Pagi Hari": {
            "question": "Usia Pengemudi?",
            "options": {
                "Bukan Di Bawah Umur": {
                    "question": "Faktor Penyebab?",
                    "options": {
                        "Bukan Faktor Lingkungan": {
                            "question": "Faktor Penyebab?",
                            "options": {
                                "Bukan Faktor Jalan": {
                                    "question": "Hari Kejadian?",
                                    "options": {
                                        "Hari Kerja": {
                                            "result": result1
                                        },
                                        "Hari Akhir Pekan": {
                                            "question": "Waktu Kejadian?",
                                            "options": {
                                                "Bukan Siang Hari": {
                                                    "result": result2
                                                },
                                                "Siang Hari": {
                                                    "question": "Jenis Jalan?",
                                                    "options": {
                                                        "Jalan Tol": {
                                                            "result": result3
                                                        },
                                                        "Jalan Non-Tol": {
                                                            "result": result4
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                },
                                "Faktor Jalan": {
                                    "question": "Jenis Kendaraan?",
                                    "options": {
                                        "Bukan Kendaraan Berat": {
                                            "result": result5
                                        },
                                        "Kendaraan Berat": {
                                            "result": result6
                                        }
                                    }
                                }
                            }
                        },
                        "Faktor Lingkungan": {
                            "result": result7
                        }
                    }
                },
                "Di Bawah Umur": {
                    "question": "Waktu Kejadian?",
                    "options": {
                        "Bukan Sore Hari": {
                            "result": result8
                        },
                        "Sore Hari": {
                            "result": result9
                        }
                    }
                }

            }
        },
        "Pagi Hari": {
            "question": "Hari Kejadian?",
            "options": {
                "Hari Akhir Pekan": {
                    "question": "Usia Pengemudi?",
                    "options": {
                        "Bukan Ideal": {
                            "result": result10
                        },
                        "Ideal": {
                            "question": "Jenis Kendaraan?",
                            "options": {
                                "Bukan Kendaraan Ringan": {
                                    "question": "Faktor Penyebab?",
                                    "options": {
                                        "Bukan Faktor Jalan": {
                                            "result": result11
                                        },
                                        "Faktor Jalan": {
                                            "result": result12
                                        }
                                    }
                                },
                                "Kendaraan Ringan": {
                                    "question": "Faktor Penyebab?",
                                    "options": {
                                        "Bukan Faktor Manusia": {
                                            "result": result13
                                        },
                                        "Faktor Manusia": {
                                            "result": result14
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Hari Kerja": {
                    "question": "Faktor Penyebab?",
                    "options": {
                        "Bukan Faktor Kendaraan": {
                            "question": "Usia Pengemudi?",
                            "options": {
                                "Bukan Di Bawah Umur": {
                                    "result": result15
                                },
                                "Di Bawah Umur": {
                                    "result": result16
                                }
                            }
                        },
                        "Faktor Kendaraan": {
                            "result": result17
                        }
                    }
                }
            }
        }
    }
};

const flowContainer = document.getElementById("flow");
const resultContainer = document.getElementById("result");

function addNode(node) {
    const nodeDiv = document.createElement("div");
    nodeDiv.className = "node";

    if (node.question) {
        const q = document.createElement("h3");
        q.textContent = node.question;
        nodeDiv.appendChild(q);

        const select = document.createElement("select");
        const defaultOpt = document.createElement("option");
        defaultOpt.textContent = "-- pilih --";
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        select.appendChild(defaultOpt);

        Object.keys(node.options).forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });

        select.addEventListener("change", () => {
            // Hapus semua elemen setelah nodeDiv
            while (nodeDiv.nextSibling) {
                flowContainer.removeChild(nodeDiv.nextSibling);
            }
            resultContainer.textContent = "";
            resultContainer.style.background = "#eef3ff"; // reset default
            resultContainer.style.color = "#1a73e8";

            const chosen = node.options[select.value];
            if (chosen.result) {
                resultContainer.textContent = chosen.result;

                if (chosen.result.includes("tidak menyebabkan korban jiwa")) {
                    resultContainer.style.background = "#dbeafe";
                    resultContainer.style.color = "#1e3a8a";
                } else if (chosen.result.includes("menyebabkan korban jiwa")) {
                    resultContainer.style.background = "#fee2e2";
                    resultContainer.style.color = "#991b1b";
                }
            } else {
                addArrow();
                addNode(chosen);
            }
        });

        nodeDiv.appendChild(select);
    }

    flowContainer.appendChild(nodeDiv);
}

function addArrow() {
    const arrowDiv = document.createElement("div");
    arrowDiv.className = "arrow";
    arrowDiv.textContent = "→";
    flowContainer.appendChild(arrowDiv);
}

// mulai dari root
addNode(tree);

document.getElementById("predictForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    let data = {};
    formData.forEach((value, key) => data[key] = value);

    const loadingEl = document.getElementById("loading");
    const resultEl = document.getElementById("resultPredict");
    loadingEl.style.display = "block";
    resultEl.style.display = "none";
    resultEl.innerText = "";
    resultEl.className = ""; // reset class

    try {
        const response = await fetch("/predict_pola", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Tentukan warna box berdasarkan hasil
        if (result.label && result.label.toLowerCase().includes("tidak ada korban jiwa")) {
            resultEl.classList.add("result-safe");
        } else {
            resultEl.classList.add("result-danger");
        }

        // Tampilkan hasil di HTML
        resultEl.innerText = result.label;
        // this.reset();
        resultEl.style.display = "block";
    } catch (error) {
        resultEl.classList.add("result-danger");
        resultEl.innerText = "❌ Terjadi kesalahan: " + error;
        resultEl.style.display = "block";
    } finally {
        loadingEl.style.display = "none";
    }
});
